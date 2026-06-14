"use client";

import { useState, useTransition } from "react";
import { submitWholesale } from "@/lib/actions";
import { trackGA4Lead, trackPixelLead } from "@/lib/analytics";

const VOLUME_OPTIONS = [
  "50–100 pieces / month",
  "100–250 pieces / month",
  "250–500 pieces / month",
  "500+ pieces / month",
];

export default function WholesaleForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitWholesale(formData);
      if (result.success) {
        trackGA4Lead();
        trackPixelLead();
        setSubmitted(true);
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  if (submitted) {
    return (
      <div className="py-16 text-center border border-brand-border bg-brand-surface">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-px w-8 bg-brand-border" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-brand-muted uppercase">
            Enquiry Received
          </p>
          <span className="h-px w-8 bg-brand-border" />
        </div>
        <h2 className="font-heading font-semibold text-brand-indigo text-3xl mb-4">
          Thank you
        </h2>
        <p className="font-body text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
          Our trade team will review your enquiry and be in touch within one business day.
        </p>
      </div>
    );
  }

  const fieldCls =
    "w-full bg-brand-bg border border-brand-border text-brand-text font-body text-sm px-4 py-3.5 placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-muted transition-colors duration-150";

  const labelCls =
    "block font-body text-[11px] tracking-[0.2em] text-brand-muted uppercase mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Company + Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Company / Business *</label>
          <input
            type="text"
            name="company"
            required
            placeholder="Your store or business name"
            className={fieldCls}
          />
        </div>
        <div>
          <label className={labelCls}>Your Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Buyer or owner name"
            className={fieldCls}
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Email Address *</label>
          <input
            type="email"
            name="email"
            required
            placeholder="trade@yourstore.com"
            className={fieldCls}
          />
        </div>
        <div>
          <label className={labelCls}>Phone / WhatsApp</label>
          <input
            type="tel"
            name="phone"
            placeholder="+880 1700 000000"
            className={fieldCls}
          />
        </div>
      </div>

      {/* Monthly volume */}
      <div>
        <label className={labelCls}>Estimated Monthly Volume</label>
        <select name="volume" className={fieldCls}>
          <option value="">Select a range</option>
          {VOLUME_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className={labelCls}>Additional Notes</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Styles you're interested in, brands you currently carry, or anything else."
          className={`${fieldCls} resize-none`}
        />
      </div>

      {error && (
        <p className="font-body text-sm text-red-600 border border-red-200 bg-red-50 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-brand-indigo text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 hover:bg-primary disabled:opacity-60"
      >
        {isPending ? "Submitting…" : "Submit Trade Enquiry"}
      </button>

      <p className="font-body text-[11px] text-brand-muted/60 text-center">
        We respond to all trade enquiries within one business day
      </p>
    </form>
  );
}
