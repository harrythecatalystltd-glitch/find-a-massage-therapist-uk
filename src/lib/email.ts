// SERVER ONLY. Uses the MailerSend API token — never import in a client component.
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

function client() {
  return new MailerSend({ apiKey: process.env.MAILERSEND_API_TOKEN! });
}

function fromSender() {
  return new Sender(process.env.MAILERSEND_FROM_EMAIL!, "Find a Massage Therapist UK");
}

function siteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SITE_URL is not set — cannot build an email link");
  return url;
}

export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${siteUrl()}/verify?token=${token}`;
  const params = new EmailParams()
    .setFrom(fromSender())
    .setTo([new Recipient(to)])
    .setSubject("Confirm your listing on Find a Massage Therapist UK")
    .setHtml(
      `<p>Thanks for submitting your listing.</p>` +
        `<p><a href="${verifyUrl}">Click here to confirm your email</a> and send your listing for review.</p>` +
        `<p>If you didn't request this, you can ignore this email.</p>`,
    )
    .setText(`Confirm your listing: ${verifyUrl}`);
  await client().email.send(params);
}

export async function sendAdminNotifyEmail(listing: { business_name: string; email: string | null; town: string | null }) {
  const params = new EmailParams()
    .setFrom(fromSender())
    .setTo([new Recipient(process.env.ADMIN_NOTIFY_EMAIL!)])
    .setSubject(`New verified listing: ${listing.business_name}`)
    .setHtml(
      `<p><strong>${listing.business_name}</strong> (${listing.town ?? "no town set"}) verified their email` +
        ` and is ready for review.</p>` +
        `<p>Contact: ${listing.email ?? "none given"}</p>` +
        `<p><a href="${siteUrl()}/admin">Review in the admin queue</a></p>`,
    )
    .setText(`${listing.business_name} verified their email and is ready for review: ${siteUrl()}/admin`);
  await client().email.send(params);
}

export async function sendContactEmail(data: { name: string; email: string; message: string }) {
  const params = new EmailParams()
    .setFrom(fromSender())
    .setTo([new Recipient(process.env.ADMIN_NOTIFY_EMAIL!)])
    .setReplyTo(new Sender(data.email, data.name))
    .setSubject(`Contact form: ${data.name}`)
    .setHtml(`<p><strong>${data.name}</strong> (${data.email}) wrote:</p><p>${data.message}</p>`)
    .setText(`${data.name} (${data.email}) wrote:\n\n${data.message}`);
  await client().email.send(params);
}

export async function sendDashboardInviteEmail(to: string, businessName: string, actionLink: string) {
  const params = new EmailParams()
    .setFrom(fromSender())
    .setTo([new Recipient(to)])
    .setSubject("Set up your therapist dashboard login")
    .setHtml(
      `<p>Your listing for <strong>${businessName}</strong> is live. You can now manage it yourself.</p>` +
        `<p><a href="${actionLink}">Click here to set a password</a> and sign in to your dashboard.</p>` +
        `<p>This link is one-time use. If it's expired, ask us to resend it.</p>`,
    )
    .setText(`Set a password to manage your listing: ${actionLink}`);
  await client().email.send(params);
}

const TIER_LABEL: Record<string, string> = { free: "Free", pro: "Pro", vip: "VIP" };

export async function sendTierChangedEmail(to: string, businessName: string, tier: string) {
  const label = TIER_LABEL[tier] ?? tier;
  const params = new EmailParams()
    .setFrom(fromSender())
    .setTo([new Recipient(to)])
    .setSubject(`Your listing is now on the ${label} plan`)
    .setHtml(
      `<p><strong>${businessName}</strong> is now on the <strong>${label}</strong> plan.</p>` +
        `<p><a href="${siteUrl()}/dashboard">Manage your listing</a></p>`,
    )
    .setText(`${businessName} is now on the ${label} plan. Manage it: ${siteUrl()}/dashboard`);
  await client().email.send(params);
}

/** For listings we researched and added ourselves (source: "research_outreach"), rather than
 * ones the business submitted — sent instead of sendApprovedEmail, since "your listing has
 * been approved" copy assumes they applied. */
export async function sendListingAddedNoticeEmail(to: string, businessName: string, slug: string) {
  const profileUrl = `${siteUrl()}/therapist/${slug}`;
  const params = new EmailParams()
    .setFrom(fromSender())
    .setTo([new Recipient(to)])
    .setSubject(`${businessName} has been added to Find a Massage Therapist UK`)
    .setHtml(
      `<p>We found <strong>${businessName}</strong> and added it to Find a Massage Therapist UK, a directory that helps people find trusted, insured massage therapists. This isn't spam and it costs nothing.</p>` +
        `<p><strong>Don't want to be listed?</strong> Just reply <strong>NO</strong> to this email and we'll remove it straight away, no questions asked.</p>` +
        `<p>Your listing is live now: <a href="${profileUrl}">${profileUrl}</a></p>` +
        `<p>You'll get a short follow-up email soon with a link to activate your own dashboard login, so you can edit your listing yourself.</p>`,
    )
    .setText(
      `We added ${businessName} to Find a Massage Therapist UK: ${profileUrl}\n\n` +
        `Don't want to be listed? Reply NO and we'll remove it.`,
    );
  await client().email.send(params);
}

export async function sendApprovedEmail(to: string, businessName: string, slug: string) {
  const profileUrl = `${siteUrl()}/therapist/${slug}`;
  const params = new EmailParams()
    .setFrom(fromSender())
    .setTo([new Recipient(to)])
    .setSubject("Your listing is live on Find a Massage Therapist UK")
    .setHtml(
      `<p>Good news! <strong>${businessName}</strong> has been approved and is now live on Find a Massage Therapist UK.</p>` +
        `<p><a href="${profileUrl}">View your listing</a></p>`,
    )
    .setText(`Your listing is live: ${profileUrl}`);
  await client().email.send(params);
}
