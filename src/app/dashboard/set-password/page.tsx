"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type LinkStatus = "checking" | "ready" | "expired";

export default function SetPasswordPage() {
  const router = useRouter();
  const [status, setStatus] = useState<LinkStatus>("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setStatus("ready");
    });
    const timeout = setTimeout(() => {
      setStatus((current) => (current === "checking" ? "expired" : current));
    }, 3000);
    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

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
    router.replace("/dashboard");
    router.refresh();
  }

  if (status === "expired") {
    return (
      <div className="site">
        <section className="section">
          <div className="container">
            <p className="form-error">
              This invite link has expired. Ask the site owner to resend your invite from /admin.
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (status === "checking") {
    return (
      <div className="site">
        <section className="section">
          <div className="container">
            <p>Verifying your invite link…</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="site">
      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit} className="listing-form">
            <div className="form-section">
              <h2>Set your password</h2>
              {error && <p className="form-error">{error}</p>}
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
                  <label htmlFor="confirm">Confirm password</label>
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
                {pending ? "Saving…" : "Set password"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
