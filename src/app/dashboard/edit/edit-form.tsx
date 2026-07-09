"use client";

import { useState } from "react";
import { useActionState } from "react";
import Image from "next/image";
import { updateOwnListing, type UpdateListingState } from "../actions";

const initialState: UpdateListingState = { status: "idle" };
const MAX_GALLERY_IMAGES = 6;

type EditableListing = {
  business_name: string;
  summary: string | null;
  phone: string | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  booking_url: string | null;
  website_url: string | null;
  logo_url: string | null;
  tier: string;
  description_long: string | null;
  gallery_urls: string[];
  treatment_type_ids: string[];
};

export function EditListingForm({
  listing,
  treatments,
}: {
  listing: EditableListing;
  treatments: { id: string; name: string }[];
}) {
  const [state, formAction, pending] = useActionState(updateOwnListing, initialState);
  const errors = state.status === "error" ? state.errors : {};
  const isVip = listing.tier === "vip";

  // Every field here is a controlled input. React resets uncontrolled form fields after
  // every action submission (success or error), which would otherwise silently wipe out
  // whatever the user typed whenever a different field fails validation.
  const [fields, setFields] = useState({
    business_name: listing.business_name,
    summary: listing.summary ?? "",
    phone: listing.phone ?? "",
    email: listing.email ?? "",
    instagram: listing.instagram ?? "",
    facebook: listing.facebook ?? "",
    booking_url: listing.booking_url ?? "",
    website_url: listing.website_url ?? "",
    description_long: listing.description_long ?? "",
  });
  function setField(name: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [name]: e.target.value }));
  }

  const [treatmentIds, setTreatmentIds] = useState<Set<string>>(
    new Set(listing.treatment_type_ids),
  );
  function toggleTreatment(id: string, checked: boolean) {
    setTreatmentIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  const [removedUrls, setRemovedUrls] = useState<Set<string>>(new Set());
  const [newFileCount, setNewFileCount] = useState(0);
  const totalGalleryCount = listing.gallery_urls.length - removedUrls.size + newFileCount;
  const overGalleryLimit = totalGalleryCount > MAX_GALLERY_IMAGES;

  function toggleRemoved(url: string, checked: boolean) {
    setRemovedUrls((prev) => {
      const next = new Set(prev);
      if (checked) next.add(url);
      else next.delete(url);
      return next;
    });
  }

  return (
    <form action={formAction} className="listing-form">
      {errors.form && <p className="form-error">{errors.form}</p>}
      {state.status === "success" && <p>Your listing has been updated.</p>}

      <div className="form-section">
        <h2>Your business</h2>
        <div className="form-grid">
          <div className="form-field full">
            <label htmlFor="business_name">Business name</label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              value={fields.business_name}
              onChange={setField("business_name")}
              required
            />
            {errors.business_name && <p className="form-error">{errors.business_name}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={fields.email}
              onChange={setField("email")}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={fields.phone}
              onChange={setField("phone")}
            />
          </div>

          <div className="form-field full">
            <label htmlFor="website_url">Website</label>
            <input
              type="url"
              id="website_url"
              name="website_url"
              placeholder="https://"
              value={fields.website_url}
              onChange={setField("website_url")}
            />
            {errors.website_url && <p className="form-error">{errors.website_url}</p>}
          </div>

          <div className="form-field full">
            <label htmlFor="summary">Short summary</label>
            <textarea
              id="summary"
              name="summary"
              maxLength={280}
              value={fields.summary}
              onChange={setField("summary")}
              required
            />
            {errors.summary && <p className="form-error">{errors.summary}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="logo">
              Logo <span className="hint">(optional, leave blank to keep your current one)</span>
            </label>
            <input type="file" id="logo" name="logo" accept="image/*" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Treatments</h2>
        <div className="form-checkbox-grid">
          {treatments.map((t) => (
            <label className="form-checkbox" key={t.id}>
              <input
                type="checkbox"
                name="treatment_type_ids"
                value={t.id}
                checked={treatmentIds.has(t.id)}
                onChange={(e) => toggleTreatment(t.id, e.target.checked)}
              />
              {t.name}
            </label>
          ))}
        </div>
        {errors.treatment_type_ids && <p className="form-error">{errors.treatment_type_ids}</p>}
      </div>

      <div className="form-section">
        <h2>Social &amp; booking</h2>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              placeholder="https://instagram.com/…"
              value={fields.instagram}
              onChange={setField("instagram")}
            />
          </div>
          <div className="form-field">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              placeholder="https://facebook.com/…"
              value={fields.facebook}
              onChange={setField("facebook")}
            />
          </div>
          <div className="form-field full">
            <label htmlFor="booking_url">Booking link</label>
            <input
              type="url"
              id="booking_url"
              name="booking_url"
              placeholder="https://"
              value={fields.booking_url}
              onChange={setField("booking_url")}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Long-form profile</h2>
        {isVip ? (
          <div className="form-field full">
            <label htmlFor="description_long">Full description</label>
            <textarea
              id="description_long"
              name="description_long"
              rows={8}
              value={fields.description_long}
              onChange={setField("description_long")}
            />
          </div>
        ) : (
          <p className="hint">
            Unlock with VIP to write a full-length profile instead of just your short summary.
          </p>
        )}
      </div>

      <div className="form-section">
        <h2>Photo gallery</h2>
        {isVip ? (
          <>
            {listing.gallery_urls.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                {listing.gallery_urls.map((url) => (
                  <label
                    key={url}
                    className="form-checkbox"
                    style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.4rem" }}
                  >
                    <Image
                      src={url}
                      alt=""
                      width={120}
                      height={120}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                    <span>
                      <input
                        type="checkbox"
                        name="gallery_remove"
                        value={url}
                        checked={removedUrls.has(url)}
                        onChange={(e) => toggleRemoved(url, e.target.checked)}
                      />{" "}
                      Remove
                    </span>
                  </label>
                ))}
              </div>
            )}
            <div className="form-field">
              <label htmlFor="gallery_files">
                Add photos <span className="hint">(up to {MAX_GALLERY_IMAGES} total)</span>
              </label>
              <input
                type="file"
                id="gallery_files"
                name="gallery_files"
                accept="image/*"
                multiple
                onChange={(e) => setNewFileCount(e.target.files?.length ?? 0)}
              />
            </div>
            <p className="hint">
              {totalGalleryCount} / {MAX_GALLERY_IMAGES} images
            </p>
            {overGalleryLimit && (
              <p className="form-error">
                You can have at most {MAX_GALLERY_IMAGES} gallery images. Remove some or select
                fewer files.
              </p>
            )}
            {errors.gallery && <p className="form-error">{errors.gallery}</p>}
          </>
        ) : (
          <p className="hint">Unlock with VIP to add up to {MAX_GALLERY_IMAGES} photos to your profile.</p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={pending || overGalleryLimit}>
          {pending ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
