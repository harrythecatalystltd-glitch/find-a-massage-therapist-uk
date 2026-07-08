// SERVER ONLY. Uses the Stripe secret key — never import in a client component.
import Stripe from "stripe";

export function stripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export type ListingTier = "free" | "pro" | "vip";

/** Maps a Stripe Price ID to a listing tier — the only source of truth for tier changes. */
export function tierForPriceId(priceId: string | undefined): ListingTier | null {
  if (priceId === process.env.STRIPE_PRICE_PRO) return "pro";
  if (priceId === process.env.STRIPE_PRICE_VIP) return "vip";
  return null;
}
