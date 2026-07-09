"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "success") {
    return (
      <div className="form-success">
        <h3>Message sent</h3>
        <p>Thanks for getting in touch. We&apos;ll reply as soon as we can.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="listing-form">
      {errors.form && <p className="form-error">{errors.form}</p>}

      <div className="form-section">
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-field full">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={6} required />
            {errors.message && <p className="form-error">{errors.message}</p>}
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
