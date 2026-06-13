"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/lib/actions";
import { trackGA4Lead, trackPixelLead } from "@/lib/analytics";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitContact(formData);
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
      <div className="py-16 text-center border border-white/[0.08] bg-brand-surface">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-px w-8 bg-white/10" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-brand-muted uppercase">
            Message Received
          </p>
          <span className="h-px w-8 bg-white/10" />
        </div>
        <h2 className="font-heading font-semibold text-brand-text text-3xl mb-4">
          Thank you
        </h2>
        <p className="font-body text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
          We&apos;ve received your message and will be in touch within one business day.
        </p>
      </div>
    );
  }

  const fieldCls =
    "w-full bg-brand-bg border border-white/[0.08] text-brand-text font-body text-sm px-4 py-3.5 placeholder:text-brand-muted/40 focus:outline-none focus:border-white/20 transition-colors duration-150";

  const labelCls =
    "block font-body text-[11px] tracking-[0.2em] text-brand-muted uppercase mb-1.5";

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className={labelCls}>Full Name *</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className={fieldCls}
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
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

      {/* Message */}
      <div>
        <label className={labelCls}>Message</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Sizing question, wholesale enquiry, or anything else — let us know."
          className={`${fieldCls} resize-none`}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="font-body text-sm text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-brand-text text-brand-bg font-body text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 hover:bg-white disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send Message"}
      </button>

      <p className="font-body text-[11px] text-brand-muted/60 text-center">
        We respond within one business day · No spam, ever
      </p>
    </form>
  );
}
