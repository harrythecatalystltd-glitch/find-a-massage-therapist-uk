// SERVER ONLY. Uses the MailerSend API token — never import in a client component.
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

function client() {
  return new MailerSend({ apiKey: process.env.MAILERSEND_API_TOKEN! });
}

function fromSender() {
  return new Sender(process.env.MAILERSEND_FROM_EMAIL!, "Find a Massage Therapist UK");
}

export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify?token=${token}`;
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
        `<p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">Review in the admin queue</a></p>`,
    )
    .setText(`${listing.business_name} verified their email and is ready for review: ${process.env.NEXT_PUBLIC_SITE_URL}/admin`);
  await client().email.send(params);
}
