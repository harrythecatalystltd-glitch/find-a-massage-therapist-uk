"use client";

import { useActionState, useState } from "react";
import { submitListing, type SubmitListingState } from "./actions";

const initialState: SubmitListingState = { status: "idle" };

export function ListingForm({
  treatments,
  hidden,
}: {
  treatments: { id: string; name: string }[];
  hidden: { source?: string; utm_source?: string; utm_medium?: string; utm_content?: string; fbclid?: string };
}) {
  const [state, formAction, pending] = useActionState(submitListing, initialState);
  const [listingType, setListingType] = useState<"clinic" | "mobile">("clinic");
  const [insured, setInsured] = useState(true);

  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "success") {
    return (
      <div className="form-success">
        <h3>Check your email</h3>
        <p>
          We&apos;ve sent a confirmation link to the email address you entered. Click it to
          send your listing to us for review. We&apos;ll be in touch once it&apos;s live.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="listing-form">
      {hidden.source && <input type="hidden" name="source" value={hidden.source} />}
      {hidden.utm_source && <input type="hidden" name="utm_source" value={hidden.utm_source} />}
      {hidden.utm_medium && <input type="hidden" name="utm_medium" value={hidden.utm_medium} />}
      {hidden.utm_content && <input type="hidden" name="utm_content" value={hidden.utm_content} />}
      {hidden.fbclid && <input type="hidden" name="fbclid" value={hidden.fbclid} />}

      {errors.form && <p className="form-error">{errors.form}</p>}

      <div className="form-section">
        <h2>Your business</h2>
        <div className="form-grid">
          <div className="form-field full">
            <label htmlFor="business_name">Business name</label>
            <input type="text" id="business_name" name="business_name" required />
            {errors.business_name && <p className="form-error">{errors.business_name}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone (optional)</label>
            <input type="tel" id="phone" name="phone" />
          </div>

          <div className="form-field full">
            <label htmlFor="website_url">Website</label>
            <input type="url" id="website_url" name="website_url" placeholder="https://" required />
            {errors.website_url && <p className="form-error">{errors.website_url}</p>}
          </div>

          <div className="form-field full">
            <label htmlFor="summary">Short summary</label>
            <textarea id="summary" name="summary" maxLength={280} required />
            {errors.summary && <p className="form-error">{errors.summary}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="logo">Logo</label>
            <input type="file" id="logo" name="logo" accept="image/*" required />
            {errors.logo && <p className="form-error">{errors.logo}</p>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Where you practise</h2>
        <div className="form-radio-group">
          <label>
            <input
              type="radio"
              name="listing_type"
              value="clinic"
              checked={listingType === "clinic"}
              onChange={() => setListingType("clinic")}
            />
            <span>Clinic / studio</span>
          </label>
          <label>
            <input
              type="radio"
              name="listing_type"
              value="mobile"
              checked={listingType === "mobile"}
              onChange={() => setListingType("mobile")}
            />
            <span>Mobile (I travel to clients)</span>
          </label>
        </div>

        <div className="form-grid" style={{ marginTop: "1.2rem" }}>
          <div className="form-field">
            <label htmlFor="town">Primary town</label>
            <input type="text" id="town" name="town" required />
            {errors.town && <p className="form-error">{errors.town}</p>}
          </div>

          {listingType === "clinic" ? (
            <div className="form-field">
              <label htmlFor="address">Clinic address</label>
              <input type="text" id="address" name="address" />
              {errors.address && <p className="form-error">{errors.address}</p>}
            </div>
          ) : (
            <div className="form-field">
              <label htmlFor="service_area">
                Towns/areas you cover <span className="hint">(comma-separated)</span>
              </label>
              <input type="text" id="service_area" name="service_area" />
              {errors.service_area && <p className="form-error">{errors.service_area}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2>Treatments</h2>
        <div className="form-checkbox-grid">
          {treatments.map((t) => (
            <label className="form-checkbox" key={t.id}>
              <input type="checkbox" name="treatment_type_ids" value={t.id} />
              {t.name}
            </label>
          ))}
        </div>
        {errors.treatment_type_ids && <p className="form-error">{errors.treatment_type_ids}</p>}
      </div>

      <div className="form-section">
        <h2>Trust &amp; credentials</h2>
        <div className="form-grid">
          <div className="form-field full">
            <label htmlFor="google_maps_url">
              Google Business Profile link <span className="hint">(optional)</span>
            </label>
            <input type="url" id="google_maps_url" name="google_maps_url" placeholder="https://" />
          </div>
          <div className="form-field">
            <label htmlFor="google_review_count">
              Google review count <span className="hint">(optional)</span>
            </label>
            <input type="number" id="google_review_count" name="google_review_count" min={0} />
          </div>
          <div className="form-field">
            <label htmlFor="google_rating">
              Google rating out of 5 <span className="hint">(optional)</span>
            </label>
            <input type="number" id="google_rating" name="google_rating" min={0} max={5} step={0.1} />
          </div>

          <div className="form-field full">
            <label htmlFor="qualifications">Qualifications</label>
            <textarea id="qualifications" name="qualifications" required />
            {errors.qualifications && <p className="form-error">{errors.qualifications}</p>}
          </div>

          <div className="form-field">
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="insured"
                checked={insured}
                onChange={(e) => setInsured(e.target.checked)}
                required
              />
              I have professional insurance
            </label>
            {errors.insured && <p className="form-error">{errors.insured}</p>}
          </div>
          {insured && (
            <div className="form-field">
              <label htmlFor="insurance_provider">Insurance provider</label>
              <input type="text" id="insurance_provider" name="insurance_provider" required />
              {errors.insurance_provider && <p className="form-error">{errors.insurance_provider}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2>Social &amp; booking (optional)</h2>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="instagram">Instagram</label>
            <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/…" />
          </div>
          <div className="form-field">
            <label htmlFor="facebook">Facebook</label>
            <input type="url" id="facebook" name="facebook" placeholder="https://facebook.com/…" />
          </div>
          <div className="form-field full">
            <label htmlFor="booking_url">Booking link</label>
            <input type="url" id="booking_url" name="booking_url" placeholder="https://" />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Submitting…" : "Submit listing"}
        </button>
      </div>
    </form>
  );
}
