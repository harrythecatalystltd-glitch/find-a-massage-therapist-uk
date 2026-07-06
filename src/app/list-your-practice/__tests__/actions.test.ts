import { beforeEach, describe, expect, it, vi } from "vitest";

const sendVerificationEmail = vi.fn().mockResolvedValue(undefined);
vi.mock("@/lib/email", () => ({ sendVerificationEmail }));

const listingsInsert = vi.fn();
const junctionInsert = vi.fn().mockResolvedValue({ error: null });
const createAdminClient = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

function buildSupabaseMock() {
  listingsInsert.mockReturnValue({
    select: () => ({
      single: () => Promise.resolve({ data: { id: "listing-1" }, error: null }),
    }),
  });
  return {
    from: (table: string) => {
      if (table === "listings") return { insert: listingsInsert };
      if (table === "listing_treatment_types") return { insert: junctionInsert };
      throw new Error(`unexpected table ${table}`);
    },
    storage: {
      from: () => ({
        upload: vi.fn().mockResolvedValue({ error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "https://example.com/logo.png" } }),
      }),
    },
  };
}

function baseFormData(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  const fields: Record<string, string> = {
    business_name: "Calm Hands Massage",
    email: "hi@calmhands.co.uk",
    website_url: "https://calmhands.co.uk",
    listing_type: "clinic",
    address: "12 High Street, Manchester",
    town: "Manchester",
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  fd.append("treatment_type_ids", "sports-massage-id");
  return fd;
}

describe("submitListing", () => {
  beforeEach(() => {
    listingsInsert.mockClear();
    junctionInsert.mockClear();
    sendVerificationEmail.mockClear();
    createAdminClient.mockReturnValue(buildSupabaseMock());
  });

  it("inserts a pending listing with a generated verification token and sends the verification email", async () => {
    const { submitListing } = await import("@/app/list-your-practice/actions");
    const result = await submitListing({ status: "idle" }, baseFormData());

    expect(result).toEqual({ status: "success" });
    expect(listingsInsert).toHaveBeenCalledTimes(1);

    const payload = listingsInsert.mock.calls[0][0];
    expect(payload.business_name).toBe("Calm Hands Massage");
    expect(payload.listing_type).toBe("clinic");
    expect(payload.verification_token).toMatch(/^[0-9a-f]{64}$/);
    expect(payload.insured).toBe(false);

    expect(junctionInsert).toHaveBeenCalledWith([
      { listing_id: "listing-1", treatment_type_id: "sports-massage-id" },
    ]);

    expect(sendVerificationEmail).toHaveBeenCalledWith(
      "hi@calmhands.co.uk",
      payload.verification_token,
    );
  });

  it("returns field errors and does not touch the database when validation fails", async () => {
    const { submitListing } = await import("@/app/list-your-practice/actions");
    const result = await submitListing(
      { status: "idle" },
      baseFormData({ email: "not-an-email" }),
    );

    expect(result.status).toBe("error");
    expect(listingsInsert).not.toHaveBeenCalled();
    expect(sendVerificationEmail).not.toHaveBeenCalled();
  });

  it("requires an address for a clinic listing and a service area for a mobile listing", async () => {
    const { submitListing } = await import("@/app/list-your-practice/actions");
    const fd = baseFormData({ address: "" });
    const result = await submitListing({ status: "idle" }, fd);

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.errors.address).toBeDefined();
    }
  });
});
