import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories } from "@/config/services";
import ConsultationCTA from "@/components/ConsultationCTA";
import LeadMagnetModal from "@/components/LeadMagnetModal";

export const metadata: Metadata = {
  title: "ByteFlow AI Labs — AI Automation Agency",
  description:
    "BD-first AI automation agency. We build self-hosted n8n workflows, WhatsApp chatbots, AI voice agents, and lead scoring systems — no SaaS lock-in, no seat fees.",
  keywords: [
    "AI automation agency",
    "n8n automation agency",
    "WhatsApp automation Bangladesh",
    "AI agent development",
    "AI consulting Bangladesh",
    "n8n VPS setup",
    "workflow automation",
  ],
  openGraph: {
    title: "ByteFlow AI Labs — AI Automation Agency",
    description:
      "Self-hosted n8n workflows, WhatsApp chatbots, AI voice agents, and lead scoring — built for businesses that want to own their automation stack.",
    url: "/",
  },
  twitter: {
    title: "ByteFlow AI Labs — AI Automation Agency",
    description:
      "Self-hosted n8n automations, WhatsApp chatbots, AI voice agents — no SaaS lock-in, no seat fees.",
  },
};

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

const stats = [
  { value: "20+", label: "Production Deployments" },
  { value: "500+", label: "Daily Workflow Executions" },
  { value: "3×", label: "Avg Lead Conversion Lift" },
  { value: "47s", label: "Avg Lead Response Time" },
];

const pillars = [
  {
    num: "01",
    title: "AI-Native",
    body: "Built around GPT-4o and Claude from the ground up — not retrofitted. AI is embedded where it genuinely moves the needle, never as a checkbox.",
  },
  {
    num: "02",
    title: "You Own Everything",
    body: "Every system runs on your VPS. No SaaS seat fees that scale against you, no vendor lock-in. You pay to build it once and run it forever.",
  },
  {
    num: "03",
    title: "BD-First, Global-Ready",
    body: "Bengali + English natively. bKash, Nagad, WhatsApp built in. Designed for Bangladesh — architecture that works anywhere else too.",
  },
  {
    num: "04",
    title: "n8n Specialists",
    body: "400+ native integrations. Custom nodes when needed. We've automated every corner of the n8n ecosystem for clients across industries.",
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery & Scope",
    body: "Free 30-min call. We map your current processes, identify the highest-ROI automations, and scope the work so there are no surprises.",
  },
  {
    num: "02",
    title: "Build & Configure",
    body: "Work starts on staging. Weekly progress updates, milestone approvals, and no scope creep — you see exactly what's being built.",
  },
  {
    num: "03",
    title: "Deploy & Train",
    body: "We move to production, run live tests with real data, and hand over Loom walkthroughs so your team can operate it confidently.",
  },
  {
    num: "04",
    title: "Support & Optimise",
    body: "1–3 month support window. 30/60/90-day reviews benchmark results, surface improvements, and keep momentum going.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] min-h-screen items-center justify-center overflow-hidden bg-brand-bg">
        {/* Blue radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,rgba(37,99,235,0.14)_0%,transparent_65%)]" />
        {/* Cyan accent glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_72%_38%,rgba(34,211,238,0.07)_0%,transparent_55%)]" />
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 text-center max-w-[1000px] mx-auto px-6 lg:px-10 pt-20 pb-32">
          {/* Eyebrow */}
          <p className="font-body text-[11px] tracking-[0.45em] text-accent/80 uppercase mb-8">
            AI Automation Agency · BD-First, Global-Ready
          </p>

          {/* Headline */}
          <h1 className="font-heading font-semibold text-brand-text leading-[1.06] text-[2.15rem] sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] mb-8">
            Transform Your Business{" "}
            <br className="hidden sm:block" />
            with{" "}
            <span className="inline-block" style={gradientText}>
              AI Automation
            </span>
          </h1>

          {/* Subline */}
          <p className="font-body text-[15px] sm:text-base text-brand-muted leading-[1.85] max-w-[560px] mx-auto mb-12">
            AI agents, smart automations, and intelligent workflows that save time, cut
            costs, and accelerate growth — without hiring more staff.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ConsultationCTA
              className="px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
              style={gradientBg}
            >
              Book Free Consultation
            </ConsultationCTA>
            <Link
              href="/services"
              className="px-10 py-4 bg-transparent text-brand-text font-body text-[11px] font-normal tracking-[0.2em] uppercase border border-white/20 hover:border-accent hover:text-accent transition-all duration-300"
            >
              Explore Services →
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-brand-muted/50">
            Scroll
          </span>
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, rgba(34,211,238,0.45), transparent)" }}
          />
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-y border-primary/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-10 px-6 text-center ${
                  i !== 0 ? "border-l border-primary/10" : ""
                }`}
              >
                <div
                  className="font-heading font-semibold text-3xl sm:text-4xl mb-2"
                  style={gradientText}
                >
                  {s.value}
                </div>
                <p className="font-body text-[11px] text-brand-muted tracking-[0.12em] uppercase leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ByteFlow ──────────────────────────────────────────────────── */}
      <section className="bg-brand-bg py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-primary/40" />
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                Why ByteFlow
              </p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight">
              AI-Native.{" "}
              <span style={gradientText}>No Lock-in.</span>
              {" "}Built for You.
            </h2>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="border border-primary/15 bg-brand-surface p-8 hover:border-primary/30 transition-colors duration-300"
              >
                <div
                  className="font-heading font-semibold text-[2rem] leading-none mb-5 opacity-20"
                  style={gradientText}
                >
                  {p.num}
                </div>
                <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services overview ─────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-primary/40" />
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                What We Do
              </p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-6">
              Eight Ways We Can{" "}
              <span style={gradientText}>Automate Your Business</span>
            </h2>
            <p className="font-body text-brand-muted text-[15px] max-w-xl mx-auto leading-relaxed">
              From WhatsApp chatbots to voice agents to full ad-tracking stacks — every
              service self-hosted, documented, and yours to keep.
            </p>
          </div>

          {/* Cards 4×2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {serviceCategories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/services#${cat.id}`}
                className="group border border-primary/15 bg-brand-bg p-7 hover:border-primary/35 hover:bg-brand-bg/80 transition-all duration-300"
              >
                <div className="text-3xl mb-5">{cat.icon}</div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-heading font-semibold text-brand-text text-[1rem] leading-snug">
                    {cat.title}
                  </h3>
                  <span className="text-brand-muted group-hover:text-accent transition-colors duration-200 text-lg shrink-0">
                    →
                  </span>
                </div>
                <p className="font-body text-[13px] text-brand-muted leading-relaxed line-clamp-3">
                  {cat.tagline}
                </p>
                <div className="mt-5 flex items-center gap-1.5">
                  <span className="font-body text-[11px] text-accent/70 group-hover:text-accent tracking-[0.12em] uppercase transition-colors duration-200">
                    {cat.services.length} services
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-body text-[11px] text-brand-muted hover:text-accent tracking-[0.2em] uppercase transition-colors duration-200 border border-primary/20 hover:border-primary/40 px-7 py-3"
            >
              View Full Services Catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How We Work ───────────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-primary/40" />
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                The Process
              </p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight">
              From Idea to Automated{" "}
              <span style={gradientText}>in Weeks</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line — large screens */}
            <div className="hidden lg:block absolute top-[22px] left-[13%] right-[13%] h-px bg-primary/15" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {steps.map((step) => (
                <div key={step.num}>
                  {/* Circle */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-7 relative z-10 lg:mx-auto border border-primary/30"
                    style={{ background: "rgba(37,99,235,0.08)" }}
                  >
                    <span style={gradientText} className="font-heading font-semibold text-sm">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-brand-text text-lg mb-3 lg:text-center">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed lg:text-center">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Free Guide (Lead Magnet) ──────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

            {/* Left: copy */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-8 bg-primary/40" />
                <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                  Free Guide
                </p>
              </div>
              <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-5">
                10 AI Automations{" "}
                <span style={gradientText}>Every BD Business Needs</span>
              </h2>
              <p className="font-body text-brand-muted text-[15px] leading-relaxed mb-8 max-w-lg">
                A practical playbook of the top AI automations used by fast-growing businesses in Bangladesh — free, no credit card required.
              </p>
              <LeadMagnetModal />
            </div>

            {/* Right: guide cover preview */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Ambient glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.12)_0%,transparent_70%)]" />

              <div
                className="relative w-[240px] sm:w-[280px] aspect-[3/4] border border-primary/25 bg-brand-bg flex flex-col justify-between p-7"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(37,99,235,0.06), 0 24px 60px rgba(37,99,235,0.10)",
                }}
              >
                {/* Gradient corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-25"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                />

                {/* Top */}
                <div>
                  <p className="font-body text-[9px] tracking-[0.4em] text-accent/80 uppercase mb-4">
                    ByteFlow AI Labs
                  </p>
                  <div className="h-px w-full bg-primary/20 mb-5" />
                  <h3 className="font-heading font-semibold text-brand-text text-xl leading-snug mb-1">
                    10 AI Automations
                  </h3>
                  <p className="font-heading text-brand-muted text-base leading-snug">
                    Every BD Business Needs
                  </p>
                </div>

                {/* Bottom: preview items */}
                <div>
                  <div className="h-px w-full bg-primary/20 mb-4" />
                  <ul className="space-y-2.5">
                    {[
                      "WhatsApp Lead Bots",
                      "AI Voice Receptionists",
                      "Auto Follow-Up Flows",
                      "AI Content Pipelines",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
                        />
                        <span className="font-body text-[11px] text-brand-muted/80">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-surface border-t border-primary/10 py-24 lg:py-32">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Get Started
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-6">
            Ready to Automate{" "}
            <span style={gradientText}>Your Business?</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-10">
            Book a free 30-minute consultation and we&apos;ll map out exactly what we can
            automate for you — no sales pitch, no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ConsultationCTA
              className="px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
              style={gradientBg}
            >
              Book a Free Consultation
            </ConsultationCTA>
            <Link
              href="/about"
              className="font-body text-[11px] text-brand-muted hover:text-accent tracking-[0.2em] uppercase transition-colors duration-200"
            >
              About us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
