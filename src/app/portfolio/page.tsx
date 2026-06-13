import { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/config/caseStudies";
import ConsultationCTA from "@/components/ConsultationCTA";

export const metadata: Metadata = {
  title: "Portfolio — ByteFlow AI Labs",
  description:
    "Real projects, honest outcomes. ByteFlow AI Labs case studies: AI real estate platforms, WhatsApp automation, and more.",
  keywords: [
    "AI automation case studies",
    "n8n workflow portfolio",
    "WhatsApp automation results",
    "AI agency work examples",
  ],
  openGraph: {
    title: "Portfolio — ByteFlow AI Labs",
    description:
      "Real projects, honest outcomes. Case studies covering AI real estate platforms, WhatsApp automation for e-commerce, and more — no fabricated metrics.",
    url: "/portfolio",
  },
  twitter: {
    title: "Portfolio — ByteFlow AI Labs",
    description:
      "Real AI automation projects with honest results. Case studies for real estate, e-commerce, and more.",
  },
};

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

export default function PortfolioPage() {
  const live = caseStudies.filter((cs) => !cs.isPlaceholder);
  const placeholder = caseStudies.find((cs) => cs.isPlaceholder);

  return (
    <div className="bg-brand-bg">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.10)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Our Work
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.08] mb-8">
            Real Projects,{" "}
            <span style={gradientText}>Honest Results</span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Every case study documents what was actually built and what was actually
            delivered — no fabricated metrics, no stock-photo mockups, no vanity numbers.
          </p>
        </div>
      </section>

      {/* ── Case studies ────────────────────────────────────────────────────── */}
      {live.map((cs, i) => (
        <section
          key={cs.id}
          id={cs.id}
          className={`py-20 lg:py-28 border-t border-primary/10 ${
            i % 2 === 0 ? "bg-brand-bg" : "bg-brand-surface"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Project header */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="font-body text-[10px] font-medium tracking-[0.3em] text-accent uppercase border border-accent/20 px-2.5 py-1">
                  {cs.industry}
                </span>
                <span className="font-body text-[10px] text-brand-muted tracking-[0.2em] uppercase">
                  {cs.location}
                </span>
                <span className="font-body text-[10px] text-brand-muted tracking-[0.2em]">
                  · {cs.year}
                </span>
              </div>
              <h2 className="font-heading font-semibold text-brand-text text-[1.6rem] sm:text-3xl lg:text-4xl leading-tight mb-4">
                {cs.client}
              </h2>
              <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl">
                {cs.tagline}
              </p>
            </div>

            {/* Challenge / Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div
                className={`border border-primary/15 p-8 ${
                  i % 2 === 0 ? "bg-brand-surface" : "bg-brand-bg"
                }`}
              >
                <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
                  The Challenge
                </p>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  {cs.challenge}
                </p>
              </div>

              <div
                className={`border border-primary/15 p-8 ${
                  i % 2 === 0 ? "bg-brand-surface" : "bg-brand-bg"
                }`}
              >
                <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
                  What We Built
                </p>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  {cs.solution}
                </p>
              </div>
            </div>

            {/* Technology stack */}
            <div className="mb-8">
              <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {cs.technology.map((tech) => (
                  <span
                    key={tech}
                    className="font-body text-[11px] text-brand-muted border border-primary/15 px-3 py-1.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-12">
              <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-5">
                Results & Outcomes
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cs.results.map((r) => (
                  <div
                    key={r.label}
                    className={`border p-6 ${
                      r.isPlaceholder
                        ? "border-dashed border-primary/20 opacity-50"
                        : "border-primary/15"
                    } ${i % 2 === 0 ? "bg-brand-surface" : "bg-brand-bg"}`}
                  >
                    <p className="font-body text-[10px] tracking-[0.2em] text-accent/60 uppercase mb-2">
                      {r.label}
                    </p>
                    <p
                      className={`font-heading font-semibold leading-snug ${
                        r.isPlaceholder ? "text-brand-muted/50 text-sm italic" : "text-brand-text text-base"
                      }`}
                    >
                      {r.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2 border-t border-primary/10">
              <ConsultationCTA
                className="inline-flex items-center px-8 py-3.5 text-white font-body text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-200 hover:-translate-y-0.5"
                style={gradientBg}
              >
                Start Your Project
              </ConsultationCTA>
              <span className="font-body text-xs text-brand-muted">
                Free 30-min scoping call · No commitment required
              </span>
            </div>
          </div>
        </section>
      ))}

      {/* ── Placeholder slot ────────────────────────────────────────────────── */}
      {placeholder && (
        <section className="py-20 lg:py-24 border-t border-primary/10 bg-brand-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="border border-dashed border-primary/20 p-12 lg:p-16 text-center">
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent/50 uppercase mb-5">
                Case Study · Coming Soon
              </p>
              <h2 className="font-heading font-semibold text-brand-muted text-2xl sm:text-3xl mb-4">
                {placeholder.client}
              </h2>
              <p className="font-body text-brand-muted/60 text-[15px] mb-8 max-w-lg mx-auto">
                {placeholder.tagline}
              </p>
              <ConsultationCTA
                className="inline-flex items-center px-8 py-3.5 text-white font-body text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-200 hover:-translate-y-0.5"
                style={gradientBg}
              >
                Start Your Project
              </ConsultationCTA>
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-bg border-t border-primary/10 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.09)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Your Project
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-6">
            Ready to Build{" "}
            <span style={gradientText}>Something Real?</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-10">
            Tell us what you want to automate. We&apos;ll scope it clearly, build it
            properly, and document everything — so your business owns it forever.
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
