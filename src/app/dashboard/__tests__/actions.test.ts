import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

const getUser = vi.fn();
const createClient = vi.fn().mockResolvedValue({ auth: { getUser } });
vi.mock("@/lib/supabase/server", () => ({ createClient }));

const createAdminClient = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

const listingsUpdate = vi.fn().mockReturnValue({ eq: () => Promise.resolve({ error: null }) });
const treatmentDelete = vi.fn().mockReturnValue({ eq: () => Promise.resolve({ error: null }) });
const treatmentInsert = vi.fn().mockResolvedValue({ error: null });
const storageUpload = vi.fn().mockResolvedValue({ error: null });
const storageGetPublicUrl = vi
  .fn()
  .mockReturnValue({ data: { publicUrl: "https://cdn.example.com/logo.png" } });

function buildAdminMock(
  listing: { id: string; tier: string; logo_url: string | null; gallery_urls?: string[] } | null,
) {
  const data = listing ? { gallery_urls: [], ...listing } : null;
  return {
    from: (table: string) => {
      if (table === "listings") {
        return {
          select: () => ({
            eq: () => ({ maybeSingle: () => Promise.resolve({ data, error: null }) }),
          }),
          update: listingsUpdate,
        };
      }
      if (table === "listing_treatment_types") {
        return { delete: treatmentDelete, insert: treatmentInsert };
      }
      throw new Error(`unexpected table ${table}`);
    },
    storage: {
      from: () => ({ upload: storageUpload, getPublicUrl: storageGetPublicUrl }),
    },
  };
}

function buildFormData(fields: Record<string, string | string[] | File | File[]>) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      value.forEach((v) => fd.append(key, v));
    } else {
      fd.append(key, value);
    }
  }
  return fd;
}

function makeImageFile(name: string) {
  return new File(["fake-image-bytes"], name, { type: "image/jpeg" });
}

const baseFields = {
  business_name: "Some Clinic",
  summary: "A relaxing massage practice in the city centre.",
  treatment_type_ids: ["treatment-1"],
};

describe("updateOwnListing", () => {
  beforeEach(() => {
    listingsUpdate.mockClear();
    treatmentDelete.mockClear();
    treatmentInsert.mockClear();
    storageUpload.mockClear();
    storageGetPublicUrl.mockClear();
    getUser.mockReset();
  });

  it("rejects when there is no session", async () => {
    getUser.mockResolvedValue({ data: { user: null } });
    createAdminClient.mockReturnValue(buildAdminMock(null));
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    const result = await updateOwnListing({ status: "idle" }, buildFormData(baseFields));

    expect(result.status).toBe("error");
    expect(listingsUpdate).not.toHaveBeenCalled();
  });

  it("rejects when the session user owns no listing", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    createAdminClient.mockReturnValue(buildAdminMock(null));
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    const result = await updateOwnListing({ status: "idle" }, buildFormData(baseFields));

    expect(result.status).toBe("error");
    expect(listingsUpdate).not.toHaveBeenCalled();
  });

  it("surfaces a validation error and skips the write when a required field is missing", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    createAdminClient.mockReturnValue(buildAdminMock({ id: "listing-1", tier: "free", logo_url: null }));
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    const result = await updateOwnListing(
      { status: "idle" },
      buildFormData({ ...baseFields, business_name: "" }),
    );

    expect(result.status).toBe("error");
    if (result.status === "error") expect(result.errors.business_name).toBeTruthy();
    expect(listingsUpdate).not.toHaveBeenCalled();
  });

  it("updates the whitelisted fields and replaces the treatment selection", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    createAdminClient.mockReturnValue(
      buildAdminMock({ id: "listing-1", tier: "free", logo_url: "https://cdn.example.com/old.png" }),
    );
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    const result = await updateOwnListing(
      { status: "idle" },
      buildFormData({ ...baseFields, treatment_type_ids: ["treatment-1", "treatment-2"] }),
    );

    expect(result.status).toBe("success");
    expect(listingsUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ business_name: "Some Clinic", logo_url: "https://cdn.example.com/old.png" }),
    );
    expect(treatmentDelete).toHaveBeenCalledTimes(1);
    expect(treatmentInsert).toHaveBeenCalledWith([
      { listing_id: "listing-1", treatment_type_id: "treatment-1" },
      { listing_id: "listing-1", treatment_type_id: "treatment-2" },
    ]);
  });

  it("never writes tier, is_featured, dofollow, status, slug, or stripe fields even if present in the form", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    createAdminClient.mockReturnValue(buildAdminMock({ id: "listing-1", tier: "free", logo_url: null }));
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    await updateOwnListing(
      { status: "idle" },
      buildFormData({
        ...baseFields,
        tier: "vip",
        is_featured: "true",
        dofollow: "true",
        status: "approved",
        slug: "hacked-slug",
        stripe_customer_id: "cus_evil",
      }),
    );

    const written = listingsUpdate.mock.calls[0][0];
    expect(written).not.toHaveProperty("tier");
    expect(written).not.toHaveProperty("is_featured");
    expect(written).not.toHaveProperty("dofollow");
    expect(written).not.toHaveProperty("status");
    expect(written).not.toHaveProperty("slug");
    expect(written).not.toHaveProperty("stripe_customer_id");
  });

  it("only writes description_long when the listing is VIP", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    createAdminClient.mockReturnValue(buildAdminMock({ id: "listing-1", tier: "pro", logo_url: null }));
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    await updateOwnListing(
      { status: "idle" },
      buildFormData({ ...baseFields, description_long: "A very long description." }),
    );

    expect(listingsUpdate.mock.calls[0][0]).not.toHaveProperty("description_long");
  });

  it("writes description_long for a VIP listing", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    createAdminClient.mockReturnValue(buildAdminMock({ id: "listing-1", tier: "vip", logo_url: null }));
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    await updateOwnListing(
      { status: "idle" },
      buildFormData({ ...baseFields, description_long: "A very long description." }),
    );

    expect(listingsUpdate.mock.calls[0][0]).toMatchObject({
      description_long: "A very long description.",
    });
  });

  it("removes selected gallery images and appends newly uploaded ones for a VIP listing", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    createAdminClient.mockReturnValue(
      buildAdminMock({
        id: "listing-1",
        tier: "vip",
        logo_url: null,
        gallery_urls: ["https://cdn.example.com/old1.png", "https://cdn.example.com/old2.png"],
      }),
    );
    storageGetPublicUrl.mockReturnValueOnce({ data: { publicUrl: "https://cdn.example.com/new1.png" } });
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    const result = await updateOwnListing(
      { status: "idle" },
      buildFormData({
        ...baseFields,
        gallery_remove: ["https://cdn.example.com/old1.png"],
        gallery_files: makeImageFile("photo.jpg"),
      }),
    );

    expect(result.status).toBe("success");
    expect(listingsUpdate.mock.calls[0][0]).toMatchObject({
      gallery_urls: ["https://cdn.example.com/old2.png", "https://cdn.example.com/new1.png"],
    });
  });

  it("rejects when the combined gallery would exceed 6 images", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    const sixExisting = Array.from({ length: 6 }, (_, i) => `https://cdn.example.com/img${i}.png`);
    createAdminClient.mockReturnValue(
      buildAdminMock({ id: "listing-1", tier: "vip", logo_url: null, gallery_urls: sixExisting }),
    );
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    const result = await updateOwnListing(
      { status: "idle" },
      buildFormData({ ...baseFields, gallery_files: makeImageFile("seventh.jpg") }),
    );

    expect(result.status).toBe("error");
    if (result.status === "error") expect(result.errors.gallery).toBeTruthy();
    expect(listingsUpdate).not.toHaveBeenCalled();
  });

  it("ignores gallery uploads and removals entirely for non-VIP tiers", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    createAdminClient.mockReturnValue(
      buildAdminMock({
        id: "listing-1",
        tier: "free",
        logo_url: null,
        gallery_urls: ["https://cdn.example.com/old1.png"],
      }),
    );
    const { updateOwnListing } = await import("@/app/dashboard/actions");

    await updateOwnListing(
      { status: "idle" },
      buildFormData({
        ...baseFields,
        gallery_remove: ["https://cdn.example.com/old1.png"],
        gallery_files: makeImageFile("photo.jpg"),
      }),
    );

    expect(listingsUpdate.mock.calls[0][0]).not.toHaveProperty("gallery_urls");
    expect(storageUpload).not.toHaveBeenCalled();
  });
});
