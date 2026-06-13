import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blue Heritage Denim — Crafted for Heritage. Designed for Today.",
  description:
    "Premium heritage denim built with exceptional materials and designed for modern everyday life. Shop Blue Heritage Denim.",
  openGraph: {
    title: "Blue Heritage Denim — Crafted for Heritage. Designed for Today.",
    description: "Premium heritage denim built for modern life.",
    url: "/",
  },
};

const pillars = [
  {
    num: "01",
    title: "Heritage Materials",
    body: "Every piece starts with premium cotton weaves and natural indigo processes used by heritage mills — nothing synthetic, nothing rushed.",
  },
  {
    num: "02",
    title: "Considered Construction",
    body: "Reinforced seams, bar-tacking at stress points, and hardware that will outlast the denim. Built to break in beautifully over years, not weeks.",
  },
  {
    num: "03",
    title: "Modern Fit Architecture",
    body: "Silhouettes designed around how people actually move — tailored through the thigh with enough ease to sit, crouch, and live in.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-bg">
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#1C1C1C 1px, transparent 1px), linear-gradient(90deg, #1C1C1C 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 lg:px-10 pt-24 pb-36">
          {/* Eyebrow */}
          <p className="font-body text-[10px] tracking-[0.5em] text-brand-muted uppercase mb-10">
            Est. 2025 · Heritage Craft · Modern Form
          </p>

          {/* Headline */}
          <h1 className="font-heading font-bold text-brand-indigo leading-[1.04] text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] mb-8 tracking-[-0.01em]">
            Crafted for Heritage.
            <br />
            <span className="font-light text-brand-muted">Designed for Today.</span>
          </h1>

          {/* Subline */}
          <p className="font-body text-[15px] sm:text-base text-brand-muted leading-[1.85] max-w-[480px] mx-auto mb-12">
            Premium heritage denim built with exceptional materials and designed for modern everyday life.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-10 py-4 bg-brand-indigo text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 hover:bg-primary"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 bg-transparent text-brand-text font-body text-[11px] font-normal tracking-[0.22em] uppercase border border-brand-border hover:border-brand-muted transition-all duration-200"
            >
              Explore Heritage →
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-body text-[9px] tracking-[0.35em] uppercase text-brand-muted/50">
            Scroll
          </span>
          <div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, rgba(28,28,28,0.2), transparent)" }}
          />
        </div>
      </section>

      {/* ── Brand pillars ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-brand-border py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
            {pillars.map((p) => (
              <div key={p.num} className="border-t border-brand-border pt-8">
                <span className="font-heading font-semibold text-brand-border text-[2rem] leading-none block mb-5">
                  {p.num}
                </span>
                <h3 className="font-heading font-semibold text-brand-indigo text-lg mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-t border-brand-border py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-brand-border" />
            <p className="font-body text-[10px] font-medium tracking-[0.4em] text-brand-muted uppercase">
              Ready to Wear
            </p>
            <span className="h-px w-8 bg-brand-border" />
          </div>
          <h2 className="font-heading font-bold text-brand-indigo text-[1.75rem] sm:text-4xl leading-tight mb-5">
            Find Your Perfect Fit
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-md mx-auto mb-10">
            Our size guide and AI assistant help you find the right cut, wash, and fit before you buy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-10 py-4 bg-brand-indigo text-white font-body text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 hover:bg-primary"
            >
              Browse All Styles
            </Link>
            <Link
              href="/contact"
              className="font-body text-[11px] text-brand-muted hover:text-brand-text tracking-[0.22em] uppercase transition-colors duration-200"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
