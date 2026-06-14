import { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/config/branding";
import WholesaleForm from "@/components/WholesaleForm";

export const metadata: Metadata = {
  title: "Wholesale — Blue Heritage Denim",
  description:
    "Trade accounts and wholesale pricing for boutiques and retailers. Apply for a Blue Heritage Denim trade account.",
  openGraph: {
    title: "Wholesale — Blue Heritage Denim",
    description: "Trade pricing, MOQ details, and lead times for retail partners.",
    url: "/wholesale",
  },
};

const benefits = [
  {
    num: "01",
    title: "Minimum Order",
    body: "Start from 50 pieces per style, per colourway — a clean entry point for boutiques and independent retailers. No mixed-SKU minimums.",
  },
  {
    num: "02",
    title: "Tiered Pricing",
    body: "Three volume tiers at 50–149, 150–499, and 500+ pieces. Margins range from 40 % to 58 % off recommended retail.",
  },
  {
    num: "03",
    title: "Lead Times",
    body: "In-stock styles ship within 3–5 business days from Dhaka. Custom colourways and private-label orders: 18–25 working days.",
  },
  {
    num: "04",
    title: "Trade Support",
    body: "Dedicated account contact, seasonal look-books, high-resolution product assets, and garment spec sheets for your buying team.",
  },
];

export default function WholesalePage() {
  return (
    <div className="bg-brand-bg">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-brand-border" />
            <p className="font-body text-[10px] font-medium tracking-[0.4em] text-brand-muted uppercase">
              Trade &amp; B2B
            </p>
            <span className="h-px w-8 bg-brand-border" />
          </div>
          <h1 className="font-heading font-bold text-brand-indigo text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.04] mb-8 tracking-[-0.01em]">
            Built for the Trade.
            <br />
            <span className="font-light text-brand-muted">Priced for Your Margin.</span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Blue Heritage Denim works with independent boutiques, department-store buyers, and
            online retailers across South Asia and beyond. Fill out the form below and our trade
            team will follow up within one business day.
          </p>
        </div>
      </section>

      {/* ── Trade benefits ───────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-brand-border py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-brand-border" />
              <p className="font-body text-[10px] font-medium tracking-[0.4em] text-brand-muted uppercase">
                Trade Programme
              </p>
              <span className="h-px w-8 bg-brand-border" />
            </div>
            <h2 className="font-heading font-bold text-brand-indigo text-[1.5rem] sm:text-4xl">
              Why Partner With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <div key={b.num} className="border-t border-brand-border pt-8">
                <span className="font-heading font-semibold text-brand-muted/30 text-[2rem] leading-none block mb-5">
                  {b.num}
                </span>
                <h3 className="font-heading font-semibold text-brand-indigo text-lg mb-3">
                  {b.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry form ─────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-brand-bg border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16">
            {/* Form */}
            <div>
              <div className="mb-8">
                <p className="font-body text-[10px] tracking-[0.4em] text-brand-muted uppercase mb-3">
                  Wholesale Enquiry
                </p>
                <h2 className="font-heading font-semibold text-brand-indigo text-2xl sm:text-3xl">
                  Apply for a Trade Account
                </h2>
              </div>
              <WholesaleForm />
            </div>

            {/* Aside */}
            <aside className="space-y-5 lg:pt-[4.5rem]">
              <div className="border border-brand-border bg-brand-surface p-8 space-y-6">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-2">
                    Minimum Order
                  </p>
                  <p className="font-body text-sm text-brand-text">50 pieces per style</p>
                </div>
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-2">
                    Payment Terms
                  </p>
                  <p className="font-body text-sm text-brand-muted">
                    50 % deposit, balance on dispatch. Net-30 available for established accounts.
                  </p>
                </div>
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-2">
                    Markets
                  </p>
                  <p className="font-body text-sm text-brand-muted">
                    Bangladesh, India, UAE, UK, and select international markets.
                  </p>
                </div>
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-2">
                    Direct Contact
                  </p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="font-body text-sm text-brand-text hover:text-primary transition-colors"
                  >
                    {brand.email}
                  </a>
                </div>
              </div>

              <Link
                href="/contact"
                className="block text-center border border-brand-border py-4 font-body text-[11px] tracking-[0.2em] uppercase text-brand-muted hover:text-brand-text hover:border-brand-muted transition-colors duration-200"
              >
                General Enquiries →
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
