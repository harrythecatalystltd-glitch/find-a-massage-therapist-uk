import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripeClient, tierForPriceId, type ListingTier } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTierChangedEmail } from "@/lib/email";

export const runtime = "nodejs";

async function applyTierChange(
  supabase: ReturnType<typeof createAdminClient>,
  match: { id: string } | { stripe_subscription_id: string },
  tier: ListingTier,
  extra?: { stripe_customer_id?: string | null; stripe_subscription_id?: string | null },
) {
  const base = supabase
    .from("listings")
    .update({ tier, dofollow: tier !== "free", is_featured: tier === "vip", ...extra });

  const { data } =
    "id" in match
      ? await base.eq("id", match.id).select("business_name, email").maybeSingle()
      : await base
          .eq("stripe_subscription_id", match.stripe_subscription_id)
          .select("business_name, email")
          .maybeSingle();

  if (data?.email) {
    await sendTierChangedEmail(data.email, data.business_name, tier);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: `invalid signature: ${(err as Error).message}` }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const listingId = session.client_reference_id;
      if (!listingId) break;

      const lineItems = await stripeClient().checkout.sessions.listLineItems(session.id);
      const tier = tierForPriceId(lineItems.data[0]?.price?.id);
      if (!tier) break;

      await applyTierChange(supabase, { id: listingId }, tier, {
        stripe_customer_id: typeof session.customer === "string" ? session.customer : (session.customer?.id ?? null),
        stripe_subscription_id:
          typeof session.subscription === "string" ? session.subscription : (session.subscription?.id ?? null),
      });
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const downgraded = subscription.status === "canceled" || subscription.status === "unpaid";
      const tier = downgraded ? "free" : tierForPriceId(subscription.items.data[0]?.price?.id);
      if (!tier) break;

      await applyTierChange(supabase, { stripe_subscription_id: subscription.id }, tier);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await applyTierChange(supabase, { stripe_subscription_id: subscription.id }, "free");
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
