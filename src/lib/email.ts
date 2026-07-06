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

export async function sendApprovedEmail(to: string, businessName: string, slug: string) {
  const profileUrl = `${siteUrl()}/therapist/${slug}`;
  const params = new EmailParams()
    .setFrom(fromSender())
    .setTo([new Recipient(to)])
    .setSubject("Your listing is live on Find a Massage Therapist UK")
    .setHtml(
      `<p>Good news — <strong>${businessName}</strong> has been approved and is now live on Find a Massage Therapist UK.</p>` +
        `<p><a href="${profileUrl}">View your listing</a></p>`,
    )
    .setText(`Your listing is live: ${profileUrl}`);
  await client().email.send(params);
}
