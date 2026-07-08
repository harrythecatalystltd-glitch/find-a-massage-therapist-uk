"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.replace("/dashboard");
    router.refresh();
  }

  async function handleForgotPassword() {
    if (!email) {
      setError("Enter your email above first, then click \"Forgot password\".");
      return;
    }
    setError(null);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard/set-password`,
    });
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setResetSent(true);
  }

  return (
    <div className="site">
      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit} className="listing-form">
            <div className="form-section">
              <h2>Therapist sign in</h2>
              {error && <p className="form-error">{error}</p>}
              {resetSent && <p>Check your email for a password reset link.</p>}
              <div className="form-grid">
                <div className="form-field full">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field full">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={pending}>
                {pending ? "Signing in…" : "Sign in"}
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleForgotPassword}>
                Forgot password
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
