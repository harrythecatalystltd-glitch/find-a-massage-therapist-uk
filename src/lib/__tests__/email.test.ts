import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn().mockResolvedValue({});

vi.mock("mailersend", async () => {
  const actual = await vi.importActual<typeof import("mailersend")>("mailersend");
  return {
    ...actual,
    MailerSend: vi.fn().mockImplementation(function MockMailerSend() {
      return { email: { send } };
    }),
  };
});

describe("email", () => {
  beforeEach(() => {
    send.mockClear();
    process.env.MAILERSEND_API_TOKEN = "test-token";
    process.env.MAILERSEND_FROM_EMAIL = "noreply@findamassagetherapist.co.uk";
    process.env.ADMIN_NOTIFY_EMAIL = "admin@findamassagetherapist.co.uk";
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.findamassagetherapist.co.uk";
  });

  it("sends a verification email to the therapist with a link containing the token", async () => {
    const { sendVerificationEmail } = await import("@/lib/email");
    await sendVerificationEmail("therapist@example.com", "abc123");

    expect(send).toHaveBeenCalledTimes(1);
    const params = send.mock.calls[0][0];
    expect(params.to).toEqual([{ email: "therapist@example.com", name: undefined }]);
    expect(params.html).toContain("/verify?token=abc123");
  });

  it("sends an admin notification with the listing details", async () => {
    const { sendAdminNotifyEmail } = await import("@/lib/email");
    await sendAdminNotifyEmail({
      business_name: "Calm Hands Massage",
      email: "hi@calmhands.co.uk",
      town: "Manchester",
    });

    expect(send).toHaveBeenCalledTimes(1);
    const params = send.mock.calls[0][0];
    expect(params.to).toEqual([{ email: "admin@findamassagetherapist.co.uk", name: undefined }]);
    expect(params.html).toContain("Calm Hands Massage");
    expect(params.html).toContain("Manchester");
  });

  it("throws instead of sending a broken link when NEXT_PUBLIC_SITE_URL is unset", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const { sendVerificationEmail } = await import("@/lib/email");
    await expect(sendVerificationEmail("therapist@example.com", "abc123")).rejects.toThrow(
      "NEXT_PUBLIC_SITE_URL",
    );
    expect(send).not.toHaveBeenCalled();
  });
});
