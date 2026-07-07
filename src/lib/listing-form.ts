import { z } from "zod";

export const listingFormSchema = z
  .object({
    business_name: z.string().trim().min(2, "Enter your business name"),
    email: z.email("Enter a valid email"),
    website_url: z.url("Enter a valid website URL (include https://)"),
    listing_type: z.enum(["clinic", "mobile"]),
    address: z.string().trim().optional(),
    service_area: z.string().trim().optional(),
    town: z.string().trim().min(2, "Enter the town this listing serves"),
    summary: z.string().trim().min(10, "Enter a short summary").max(280),
    phone: z.string().trim().optional(),
    instagram: z.url().optional().or(z.literal("")),
    facebook: z.url().optional().or(z.literal("")),
    booking_url: z.url().optional().or(z.literal("")),
    google_maps_url: z.url().optional().or(z.literal("")),
    google_review_count: z.coerce.number().int().min(0).optional(),
    google_rating: z.coerce.number().min(0).max(5).optional(),
    qualifications: z.string().trim().min(2, "Enter your qualifications"),
    insured: z.coerce
      .boolean()
      .refine((v) => v === true, { message: "Confirm you have professional insurance to list" }),
    insurance_provider: z.string().trim().min(2, "Enter your insurance provider"),
    treatment_type_ids: z.array(z.string()).min(1, "Select at least one treatment"),
    source: z.string().trim().optional(),
    utm_source: z.string().trim().optional(),
    utm_medium: z.string().trim().optional(),
    utm_content: z.string().trim().optional(),
    fbclid: z.string().trim().optional(),
  })
  .refine((data) => data.listing_type !== "clinic" || !!data.address, {
    message: "Enter your clinic address",
    path: ["address"],
  })
  .refine((data) => data.listing_type !== "mobile" || !!data.service_area, {
    message: "Enter the towns/areas you cover",
    path: ["service_area"],
  });

export type ListingFormInput = z.input<typeof listingFormSchema>;
export type ListingFormData = z.output<typeof listingFormSchema>;
