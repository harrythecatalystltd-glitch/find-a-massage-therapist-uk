import { describe, expect, it } from "vitest";
import { listingFormSchema } from "@/lib/listing-form";

const validClinic = {
  business_name: "Calm Hands Massage",
  email: "hi@calmhands.co.uk",
  website_url: "https://calmhands.co.uk",
  listing_type: "clinic" as const,
  address: "12 High Street, Manchester",
  town: "Manchester",
  treatment_type_ids: ["sports-massage-id"],
};

describe("listingFormSchema", () => {
  it("accepts a valid clinic submission", () => {
    const result = listingFormSchema.safeParse(validClinic);
    expect(result.success).toBe(true);
  });

  it("accepts a valid mobile submission with a service area instead of an address", () => {
    const result = listingFormSchema.safeParse({
      ...validClinic,
      listing_type: "mobile",
      address: undefined,
      service_area: "Manchester, Salford, Stockport",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a clinic listing with no address", () => {
    const result = listingFormSchema.safeParse({ ...validClinic, address: undefined });
    expect(result.success).toBe(false);
  });

  it("rejects a mobile listing with no service area", () => {
    const result = listingFormSchema.safeParse({
      ...validClinic,
      listing_type: "mobile",
      address: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing business name", () => {
    const result = listingFormSchema.safeParse({ ...validClinic, business_name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = listingFormSchema.safeParse({ ...validClinic, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid website URL", () => {
    const result = listingFormSchema.safeParse({ ...validClinic, website_url: "calmhands" });
    expect(result.success).toBe(false);
  });

  it("rejects when no treatments are selected", () => {
    const result = listingFormSchema.safeParse({ ...validClinic, treatment_type_ids: [] });
    expect(result.success).toBe(false);
  });

  it("allows optional Google/insurance fields to be omitted", () => {
    const result = listingFormSchema.safeParse(validClinic);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.insured).toBe(false);
    }
  });
});
