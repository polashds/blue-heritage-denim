import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Blue Heritage Denim",
  description:
    "Blue Heritage Denim was built on a simple conviction: great denim should last a decade, not a season. Learn our story.",
  openGraph: {
    title: "About Blue Heritage Denim",
    description:
      "Premium heritage denim built with exceptional materials and considered construction. Our story.",
    url: "/about",
  },
};

const values = [
  {
    num: "01",
    title: "Material Integrity",
    body: "We source premium cotton from mills that have been weaving denim for generations. No blends, no shortcuts — the same yarn weights and thread counts that made heritage denim legendary.",
  },
  {
    num: "02",
    title: "Longevity Over Fashion",
    body: "A pair of Blue Heritage jeans is designed to last a decade and get better with every wear. We make fewer styles, we make them better, and we stand behind every stitch.",
  },
  {
    num: "03",
    title: "Honest Fit",
    body: "Our fit ranges are sized to real body measurements, not vanity sizing. Every cut is tested across multiple body types before it reaches the collection.",
  },
  {
    num: "04",
    title: "Transparent Production",
    body: "We work with a single manufacturing partner and we're not shy about where and how our denim is made. No greenwashing — just honest craft.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-bg">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-white/10" />
            <p className="font-body text-[10px] font-medium tracking-[0.4em] text-brand-muted uppercase">
              Our Story
            </p>
            <span className="h-px w-8 bg-white/10" />
          </div>
          <h1 className="font-heading font-bold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.04] mb-8 tracking-[-0.01em]">
            Built to Last.
            <br />
            <span className="font-light text-brand-muted">Not Just to Sell.</span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Blue Heritage Denim was founded on a simple conviction: great denim should last a decade, not a season.
          </p>
        </div>
      </section>

      {/* ── Story ───────────────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-white/[0.06] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-8 bg-white/10" />
                <p className="font-body text-[10px] font-medium tracking-[0.4em] text-brand-muted uppercase">
                  Where We Started
                </p>
              </div>
              <h2 className="font-heading font-bold text-brand-text text-[1.5rem] sm:text-3xl leading-snug mb-6">
                Dhaka-Born. Heritage-Driven.
              </h2>
              <div className="space-y-4 font-body text-sm text-brand-muted leading-relaxed">
                <p>
                  We started Blue Heritage Denim in Dhaka because we were frustrated. Bangladesh is one of the world&apos;s largest garment producers — yet most of what gets made here ships overseas under someone else&apos;s label, leaving local consumers with fast fashion at premium prices.
                </p>
                <p>
                  We wanted to build something different: a denim label that uses the same quality of fabric and construction that goes into export garments, but designed specifically for how people in South Asia live, move, and dress.
                </p>
                <p>
                  Every Blue Heritage piece is cut for real body proportions, built from premium selvedge and ring-spun cotton, and finished by hand. We sell direct so the margin stays honest and the quality can stay high.
                </p>
                <p>
                  We&apos;re not a fast fashion brand. We don&apos;t do seasonal resets or trend collections. We make a small number of cuts, refine them over time, and stand behind every pair we sell.
                </p>
              </div>
            </div>

            {/* Mission + Vision */}
            <div className="space-y-5">
              <div className="border border-white/[0.08] bg-brand-bg p-8">
                <p className="font-body text-[10px] tracking-[0.35em] text-brand-muted uppercase mb-4">
                  Our Mission
                </p>
                <p className="font-heading font-semibold text-brand-text text-xl sm:text-2xl leading-snug">
                  To make premium denim that earns its place in your wardrobe for a decade — not a season.
                </p>
              </div>
              <div className="border border-white/[0.08] bg-brand-bg p-8">
                <p className="font-body text-[10px] tracking-[0.35em] text-brand-muted uppercase mb-4">
                  Our Vision
                </p>
                <p className="font-heading font-semibold text-brand-text text-xl sm:text-2xl leading-snug">
                  A world where buying less and buying better is the obvious choice — and where South Asian craft earns the recognition it deserves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-t border-white/[0.06] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-white/10" />
              <p className="font-body text-[10px] font-medium tracking-[0.4em] text-brand-muted uppercase">
                What We Stand For
              </p>
              <span className="h-px w-8 bg-white/10" />
            </div>
            <h2 className="font-heading font-bold text-brand-text text-[1.5rem] sm:text-4xl">
              Our Four Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.num} className="border-t border-white/[0.08] pt-8">
                <span className="font-heading font-semibold text-brand-muted/25 text-[2rem] leading-none block mb-5">
                  {v.num}
                </span>
                <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">
                  {v.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-white/[0.06] py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-white/10" />
            <p className="font-body text-[10px] font-medium tracking-[0.4em] text-brand-muted uppercase">
              Ready to Wear
            </p>
            <span className="h-px w-8 bg-white/10" />
          </div>
          <h2 className="font-heading font-bold text-brand-text text-[1.75rem] sm:text-4xl leading-tight mb-6">
            Built for Your Life
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-md mx-auto mb-10">
            Explore the full collection and find the cut, wash, and fit that works for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-10 py-4 bg-brand-text text-brand-bg font-body text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 hover:bg-white"
            >
              Shop the Collection
            </Link>
            <Link
              href="/contact"
              className="font-body text-[11px] text-brand-muted hover:text-brand-text tracking-[0.22em] uppercase transition-colors duration-200"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
