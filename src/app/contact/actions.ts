"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  message: z.string().trim().min(10, "Enter a message"),
});

export type ContactState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string> }
  | { status: "success" };

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  await sendContactEmail(parsed.data);
  return { status: "success" };
}
