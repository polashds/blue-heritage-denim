"use client";

import { useState } from "react";
import { trackGA4Lead, trackPixelLead } from "@/lib/analytics";

const PDF_PATH = "/ByteFlow-10-AI-Automations-Every-BD-Business-Needs.pdf";

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;
const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const fieldCls =
  "w-full bg-brand-bg border border-primary/15 text-brand-text placeholder:text-brand-muted/40 font-body text-sm px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors duration-200";
const labelCls =
  "block font-body text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-2";

interface Props {
  /** Override the trigger button label. Defaults to "Download Free". */
  label?: string;
  className?: string;
}

export default function LeadMagnetModal({ label = "Download Free", className }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  function openModal() {
    setOpen(true);
    setError("");
  }

  function closeModal() {
    setOpen(false);
    setTimeout(() => {
      setName("");
      setEmail("");
      setError("");
      setSuccess(false);
      setSubmittedEmail("");
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data: { success: boolean; error?: string } = await res.json();

      if (!data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSubmittedEmail(email.trim());
        window.open(PDF_PATH, "_blank");
        trackGA4Lead();
        trackPixelLead();
        setSuccess(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const defaultBtnCls =
    "px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]";

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────────────────── */}
      <button
        onClick={openModal}
        className={className ?? defaultBtnCls}
        style={gradientBg}
      >
        {label}
      </button>

      {/* ── Modal overlay ──────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(7,11,22,0.88)", backdropFilter: "blur(6px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="w-full max-w-md bg-brand-surface border border-primary/25 relative animate-slide-up"
            style={{
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(37,99,235,0.08)",
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-text transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="p-8">
              {!success ? (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <p className="font-body text-[10px] tracking-[0.35em] text-accent uppercase mb-3">
                      Free Guide
                    </p>
                    <h2 className="font-heading font-semibold text-brand-text text-[1.4rem] leading-snug mb-2">
                      10 AI Automations Every{" "}
                      <span style={gradientText}>BD Business Needs</span>
                    </h2>
                    <p className="font-body text-sm text-brand-muted leading-relaxed">
                      Enter your details for instant access — no credit card, no spam.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="lm-name" className={labelCls}>
                        Your Name
                      </label>
                      <input
                        id="lm-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Ahmed"
                        className={fieldCls}
                        required
                        autoComplete="name"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label htmlFor="lm-email" className={labelCls}>
                        Work Email
                      </label>
                      <input
                        id="lm-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className={fieldCls}
                        required
                        autoComplete="email"
                      />
                    </div>

                    {error && (
                      <p
                        className="font-body text-sm leading-relaxed"
                        style={{ color: "#f87171" }}
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.45)] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={gradientBg}
                    >
                      {loading ? "Sending…" : "Get Free Guide →"}
                    </button>

                    <p className="font-body text-[11px] text-brand-muted/50 text-center leading-relaxed">
                      No spam. Unsubscribe any time.
                    </p>
                  </form>
                </>
              ) : (
                /* ── Success state ──────────────────────────────────────── */
                <div className="text-center py-2">
                  {/* Check circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={gradientBg}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <h2 className="font-heading font-semibold text-brand-text text-[1.4rem] mb-3">
                    Your guide is ready!
                  </h2>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-6">
                    Your download opened in a new tab. We&apos;ve also emailed a copy to{" "}
                    <span className="text-accent">{submittedEmail}</span>.
                  </p>

                  <div className="flex flex-col gap-3">
                    <a
                      href={PDF_PATH}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.45)]"
                      style={gradientBg}
                    >
                      Open Guide Again →
                    </a>
                    <button
                      onClick={closeModal}
                      className="font-body text-[11px] text-brand-muted hover:text-brand-text tracking-[0.15em] uppercase transition-colors duration-200 py-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
