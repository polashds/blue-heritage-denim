"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/lib/actions";
import { serviceCategories } from "@/config/services";
import { BUDGET_OPTIONS } from "@/config/contact";
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
      <div className="py-16 text-center border border-primary/20 bg-brand-surface">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-px w-8 bg-primary/40" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
            Enquiry Received
          </p>
          <span className="h-px w-8 bg-primary/40" />
        </div>
        <h2 className="font-heading font-semibold text-brand-text text-3xl mb-4">
          Thank you
        </h2>
        <p className="font-body text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
          We&apos;ve received your enquiry and will be in touch within one business day.
          In the meantime, feel free to explore our{" "}
          <a href="/services" className="text-accent hover:underline">
            services
          </a>{" "}
          or{" "}
          <a href="/portfolio" className="text-accent hover:underline">
            case studies
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldCls =
    "w-full bg-brand-bg border border-primary/15 text-brand-text font-body text-sm px-4 py-3.5 placeholder:text-brand-muted/40 focus:outline-none focus:border-primary/50 transition-colors duration-150";

  const labelCls =
    "block font-body text-[11px] tracking-[0.2em] text-brand-muted uppercase mb-1.5";

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div>
          <label className={labelCls}>Company</label>
          <input
            type="text"
            name="company"
            placeholder="Company or business name"
            className={fieldCls}
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
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

      {/* Service + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Service Interested In</label>
          <select name="service" className={fieldCls} defaultValue="">
            <option value="" disabled>
              Select a service category…
            </option>
            {serviceCategories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.icon} {cat.title}
              </option>
            ))}
            <option value="Not sure — need advice">Not sure — need advice</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Approximate Budget</label>
          <select name="budget" className={fieldCls} defaultValue="">
            <option value="" disabled>
              Select a budget range…
            </option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project details */}
      <div>
        <label className={labelCls}>Project Details</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Describe what you want to automate or the problem you're trying to solve. The more specific, the better."
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
        className="w-full py-4 text-white font-body text-[11px] font-semibold tracking-[0.2em] uppercase transition-opacity duration-200 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
      >
        {isPending ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="font-body text-[11px] text-brand-muted/60 text-center">
        We respond within one business day · No spam, ever
      </p>
    </form>
  );
}
