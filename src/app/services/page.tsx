import { Metadata } from "next";
import Link from "next/link";
import { serviceCategories } from "@/config/services";
import ConsultationCTA from "@/components/ConsultationCTA";

export const metadata: Metadata = {
  title: "Services — ByteFlow AI Labs",
  description:
    "AI automation services: n8n infrastructure, WhatsApp bots, AI voice agents, lead scoring, Meta tracking, content automation, websites, and retainers — self-hosted on your VPS.",
  keywords: [
    "n8n infrastructure setup",
    "WhatsApp chatbot development",
    "AI voice agent",
    "lead scoring automation",
    "Meta CAPI server-side tracking",
    "AI content automation",
    "n8n automation services",
  ],
  openGraph: {
    title: "AI Automation Services — ByteFlow AI Labs",
    description:
      "Eight service categories — n8n VPS, WhatsApp bots, AI voice agents, lead scoring, Meta CAPI, content automation, websites, and retainers. Self-hosted, fully documented.",
    url: "/services",
  },
  twitter: {
    title: "AI Automation Services — ByteFlow AI Labs",
    description:
      "n8n VPS, WhatsApp bots, AI voice agents, lead scoring, Meta CAPI and more. Self-hosted, no lock-in.",
  },
};

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

export default function ServicesPage() {
  return (
    <div className="bg-brand-bg">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.10)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              What We Build
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.08] mb-8">
            AI Automation,{" "}
            <span style={gradientText}>Purpose-Built</span>
            {" "}for Your Business
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Eight service categories. Dozens of individual deliverables. All designed, built,
            and deployed by a specialist team — self-hosted on your infrastructure, fully
            documented, and yours to keep.
          </p>

          {/* Jump navigation */}
          <div className="flex flex-wrap justify-center gap-2">
            {serviceCategories.map((cat, i) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="font-body text-[11px] text-brand-muted hover:text-accent border border-primary/15 hover:border-primary/35 px-3.5 py-2 transition-colors duration-200"
              >
                {String.fromCharCode(65 + i)}. {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service category sections ──────────────────────────────────────── */}
      {serviceCategories.map((cat, i) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`py-20 lg:py-28 border-t border-primary/10 ${
            i % 2 === 0 ? "bg-brand-bg" : "bg-brand-surface"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section header */}
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="font-body text-[10px] font-semibold tracking-[0.4em] uppercase"
                  style={gradientText}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="h-px w-6 bg-primary/30" />
              </div>
              <div className="flex items-start gap-4 mb-5">
                <span className="text-[2.25rem] leading-none shrink-0 mt-1">{cat.icon}</span>
                <h2 className="font-heading font-semibold text-brand-text text-[1.6rem] sm:text-3xl lg:text-4xl leading-tight">
                  {cat.title}
                </h2>
              </div>
              <p className="font-body text-brand-muted text-[15px] leading-relaxed">
                {cat.body}
              </p>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {cat.services.map((svc) => (
                <div
                  key={svc.title}
                  className={`border border-primary/15 p-7 hover:border-primary/30 transition-colors duration-300 ${
                    i % 2 === 0 ? "bg-brand-surface" : "bg-brand-bg"
                  }`}
                >
                  <h3 className="font-heading font-semibold text-brand-text text-xl mb-3">
                    {svc.title}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">
                    {svc.description}
                  </p>
                  <ul className="space-y-2">
                    {svc.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-body text-sm text-brand-muted"
                      >
                        <span
                          className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0"
                          style={{ background: "#22D3EE" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Section CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <ConsultationCTA
                className="inline-flex items-center px-8 py-3.5 text-white font-body text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-200 hover:-translate-y-0.5"
                style={gradientBg}
              >
                Discuss your project
              </ConsultationCTA>
              <span className="font-body text-xs text-brand-muted">
                Free 30-min consultation · No commitment required
              </span>
            </div>
          </div>
        </section>
      ))}

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-surface border-t border-primary/10 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.09)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Get Started
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-6">
            Not Sure Where{" "}
            <span style={gradientText}>to Start?</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-10">
            Book a free 30-minute consultation. We&apos;ll audit your current operations,
            identify the three highest-ROI automations, and give you a clear scope — at
            no cost and no obligation.
          </p>
          <ConsultationCTA
            className="inline-flex items-center px-10 py-4 text-white font-body text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
            style={gradientBg}
          >
            Book a Free Consultation
          </ConsultationCTA>
        </div>
      </section>
    </div>
  );
}
