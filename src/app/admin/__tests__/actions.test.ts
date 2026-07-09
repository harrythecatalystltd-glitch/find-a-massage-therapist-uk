import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

const sendApprovedEmail = vi.fn().mockResolvedValue(undefined);
const sendDashboardInviteEmail = vi.fn().mockResolvedValue(undefined);
vi.mock("@/lib/email", () => ({ sendApprovedEmail, sendDashboardInviteEmail }));

const createAdminClient = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

const listingsUpdate = vi.fn().mockReturnValue({ eq: () => Promise.resolve({ error: null }) });
const locationsUpsert = vi.fn().mockResolvedValue({ error: null });
const createUser = vi.fn().mockResolvedValue({ data: { user: { id: "new-user-1" } }, error: null });
const generateLink = vi.fn().mockResolvedValue({
  data: { properties: { hashed_token: "hashed-abc" } },
  error: null,
});

function buildSupabaseMock({
  listing,
  existingSlugs = [],
  existingTowns = [],
}: {
  listing: {
    business_name: string;
    email: string | null;
    town: string | null;
    owner_user_id?: string | null;
  };
  existingSlugs?: string[];
  existingTowns?: string[];
}) {
  return {
    from: (table: string) => {
      if (table === "listings") {
        return {
          select: (cols: string) => {
            if (cols.includes("business_name")) {
              return { eq: () => ({ single: () => Promise.resolve({ data: listing, error: null }) }) };
            }
            return {
              not: () =>
                Promise.resolve({ data: existingSlugs.map((slug) => ({ slug })), error: null }),
            };
          },
          update: listingsUpdate,
        };
      }
      if (table === "locations") {
        return {
          select: () => Promise.resolve({ data: existingTowns.map((town) => ({ town })), error: null }),
          upsert: locationsUpsert,
        };
      }
      throw new Error(`unexpected table ${table}`);
    },
    auth: { admin: { createUser, generateLink } },
  };
}

describe("approveListing", () => {
  beforeEach(() => {
    listingsUpdate.mockClear();
    locationsUpsert.mockClear();
    sendApprovedEmail.mockClear();
    sendDashboardInviteEmail.mockClear();
    createUser.mockClear();
    generateLink.mockClear();
  });

  it("creates a new location when the listing's town isn't covered by any existing page", async () => {
    createAdminClient.mockReturnValue(
      buildSupabaseMock({
        listing: { business_name: "Regen Sports Therapy", email: "regen@example.com", town: "Washington, Tyne and Wear" },
        existingTowns: ["Newcastle", "Manchester"],
      }),
    );
    const { approveListing } = await import("@/app/admin/actions");
    await approveListing("listing-1");

    expect(locationsUpsert).toHaveBeenCalledTimes(1);
    const [row, opts] = locationsUpsert.mock.calls[0];
    expect(row).toEqual({ town: "Washington, Tyne and Wear", slug: "washington-tyne-and-wear" });
    expect(opts).toMatchObject({ onConflict: "slug" });
  });

  it("does not create a location when the town already matches an existing page", async () => {
    createAdminClient.mockReturnValue(
      buildSupabaseMock({
        listing: { business_name: "Some Clinic", email: "hi@example.com", town: "Manchester City Centre" },
        existingTowns: ["Newcastle", "Manchester"],
      }),
    );
    const { approveListing } = await import("@/app/admin/actions");
    await approveListing("listing-2");

    expect(locationsUpsert).not.toHaveBeenCalled();
  });

  it("sends the 'your listing is live' email with a link to the new profile", async () => {
    createAdminClient.mockReturnValue(
      buildSupabaseMock({
        listing: { business_name: "Some Clinic", email: "hi@example.com", town: "Manchester" },
        existingTowns: ["Manchester"],
      }),
    );
    const { approveListing } = await import("@/app/admin/actions");
    await approveListing("listing-3");

    expect(sendApprovedEmail).toHaveBeenCalledWith("hi@example.com", "Some Clinic", "some-clinic");
  });

  it("skips the email when the listing has no address on file", async () => {
    createAdminClient.mockReturnValue(
      buildSupabaseMock({
        listing: { business_name: "No Email Clinic", email: null, town: "Manchester" },
        existingTowns: ["Manchester"],
      }),
    );
    const { approveListing } = await import("@/app/admin/actions");
    await approveListing("listing-4");

    expect(sendApprovedEmail).not.toHaveBeenCalled();
    expect(createUser).not.toHaveBeenCalled();
  });

  it("provisions a dashboard login and emails the one-time set-password link on first approval", async () => {
    createAdminClient.mockReturnValue(
      buildSupabaseMock({
        listing: { business_name: "Some Clinic", email: "hi@example.com", town: "Manchester", owner_user_id: null },
        existingTowns: ["Manchester"],
      }),
    );
    const { approveListing } = await import("@/app/admin/actions");
    await approveListing("listing-5");

    expect(createUser).toHaveBeenCalledWith({ email: "hi@example.com", email_confirm: true });
    expect(listingsUpdate).toHaveBeenCalledWith({ owner_user_id: "new-user-1" });
    expect(generateLink).toHaveBeenCalledWith({
      type: "recovery",
      email: "hi@example.com",
      options: { redirectTo: expect.stringContaining("/dashboard/set-password") },
    });
    expect(sendDashboardInviteEmail).toHaveBeenCalledWith(
      "hi@example.com",
      "Some Clinic",
      expect.stringContaining("/auth/confirm?token_hash=hashed-abc&type=recovery"),
    );
  });

  it("does not re-provision a dashboard login when the listing already has an owner", async () => {
    createAdminClient.mockReturnValue(
      buildSupabaseMock({
        listing: { business_name: "Some Clinic", email: "hi@example.com", town: "Manchester", owner_user_id: "existing-user" },
        existingTowns: ["Manchester"],
      }),
    );
    const { approveListing } = await import("@/app/admin/actions");
    await approveListing("listing-6");

    expect(createUser).not.toHaveBeenCalled();
    expect(sendDashboardInviteEmail).not.toHaveBeenCalled();
  });
});
