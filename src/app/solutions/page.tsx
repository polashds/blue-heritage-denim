import { Metadata } from "next";
import Link from "next/link";
import { industrySolutions } from "@/config/solutions";
import { serviceCategories } from "@/config/services";
import ConsultationCTA from "@/components/ConsultationCTA";

export const metadata: Metadata = {
  title: "Solutions — ByteFlow AI Labs",
  description:
    "AI automation solutions by industry: real estate, e-commerce, travel, healthcare, and local services. Lead capture, WhatsApp bots, voice agents, and more.",
  keywords: [
    "AI automation real estate Bangladesh",
    "e-commerce WhatsApp automation",
    "AI voice agent healthcare",
    "lead automation agency",
    "travel booking automation",
    "AI consulting by industry",
  ],
  openGraph: {
    title: "Industry AI Automation Solutions — ByteFlow AI Labs",
    description:
      "AI automation built for your industry: real estate, e-commerce, travel, healthcare, and local services. WhatsApp bots, voice agents, lead scoring — self-hosted.",
    url: "/solutions",
  },
  twitter: {
    title: "Industry AI Automation Solutions — ByteFlow AI Labs",
    description:
      "AI automation for real estate, e-commerce, travel, healthcare, and local services. WhatsApp bots, voice agents, lead scoring.",
  },
};

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

// Build lookup map: service ID → { title, id }
const serviceMap = new Map(serviceCategories.map((cat) => [cat.id, cat]));

export default function SolutionsPage() {
  return (
    <div className="bg-brand-bg">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.10)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Industries We Serve
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.08] mb-8">
            AI Automation Built{" "}
            <span style={gradientText}>for Your Industry</span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Every industry has its own bottlenecks. We map your specific problems to
            the right automation — no generic playbooks, no retrofitted SaaS tools.
          </p>

          {/* Industry jump nav */}
          <div className="flex flex-wrap justify-center gap-2">
            {industrySolutions.map((sol, i) => (
              <a
                key={sol.id}
                href={`#${sol.id}`}
                className="inline-flex items-center gap-2 font-body text-[11px] text-brand-muted hover:text-accent border border-primary/15 hover:border-primary/35 px-4 py-2 transition-colors duration-200"
              >
                <span>{sol.icon}</span>
                <span>{sol.industry}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry sections ───────────────────────────────────────────────── */}
      {industrySolutions.map((sol, i) => (
        <section
          key={sol.id}
          id={sol.id}
          className={`py-20 lg:py-28 border-t border-primary/10 ${
            i % 2 === 0 ? "bg-brand-bg" : "bg-brand-surface"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[2.5rem] leading-none">{sol.icon}</span>
                <div>
                  <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-1">
                    {String.fromCharCode(65 + i)} · Industry Solution
                  </p>
                  <h2 className="font-heading font-semibold text-brand-text text-[1.6rem] sm:text-3xl lg:text-4xl leading-tight">
                    {sol.industry}
                  </h2>
                </div>
              </div>
              <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl">
                {sol.tagline}
              </p>
            </div>

            {/* Problem / Solution columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Problem */}
              <div
                className={`border border-primary/15 p-8 ${
                  i % 2 === 0 ? "bg-brand-surface" : "bg-brand-bg"
                }`}
              >
                <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
                  The Challenge
                </p>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  {sol.problem}
                </p>
              </div>

              {/* Solution */}
              <div
                className={`border border-primary/15 p-8 ${
                  i % 2 === 0 ? "bg-brand-surface" : "bg-brand-bg"
                }`}
              >
                <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
                  Our Approach
                </p>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  {sol.solution}
                </p>
              </div>
            </div>

            {/* Benefits + services row */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start mb-10">
              {/* Benefits */}
              <div>
                <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
                  What You Get
                </p>
                <ul className="space-y-3">
                  {sol.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 font-body text-sm text-brand-muted">
                      <span
                        className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0"
                        style={{ background: "#22D3EE" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related services */}
              <div className="lg:min-w-[260px]">
                <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
                  Services We Use
                </p>
                <div className="flex flex-wrap gap-2">
                  {sol.relatedServiceIds.map((id) => {
                    const svc = serviceMap.get(id);
                    if (!svc) return null;
                    return (
                      <a
                        key={id}
                        href={`/services#${id}`}
                        className="inline-flex items-center gap-1.5 font-body text-[11px] text-brand-muted hover:text-accent border border-primary/15 hover:border-primary/35 px-3 py-1.5 transition-colors duration-200"
                      >
                        <span className="text-sm">{svc.icon}</span>
                        <span>{svc.title}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2 border-t border-primary/10">
              <ConsultationCTA
                className="inline-flex items-center px-8 py-3.5 text-white font-body text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-200 hover:-translate-y-0.5"
                style={gradientBg}
              >
                Book a Free Consultation
              </ConsultationCTA>
              <span className="font-body text-xs text-brand-muted">
                Free 30-min call · We scope your specific {sol.industry.toLowerCase()} workflow
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
              Your Industry
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-6">
            Don&apos;t See{" "}
            <span style={gradientText}>Your Industry?</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-10">
            We&apos;ve automated workflows across sectors not listed here — education,
            logistics, finance, and more. If you have a manual process that costs time
            or money, we&apos;re worth talking to.
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
