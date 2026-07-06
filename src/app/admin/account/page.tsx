"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminAccountPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setPending(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setPending(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    setPassword("");
    setConfirm("");
    setSuccess(true);
  }

  return (
    <div className="site">
      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit} className="listing-form">
            <div className="form-section">
              <h2>Change admin password</h2>
              {error && <p className="form-error">{error}</p>}
              {success && <p>Password updated.</p>}
              <div className="form-grid">
                <div className="form-field full">
                  <label htmlFor="password">New password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field full">
                  <label htmlFor="confirm">Confirm new password</label>
                  <input
                    type="password"
                    id="confirm"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={pending}>
                {pending ? "Saving…" : "Save password"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
