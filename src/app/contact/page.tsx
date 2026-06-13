import { Metadata } from "next";
import { brand } from "@/config/branding";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Blue Heritage Denim",
  description:
    "Get in touch with Blue Heritage Denim. Questions about sizing, wholesale, or your order — we respond within one business day.",
  openGraph: {
    title: "Contact Blue Heritage Denim",
    description: "Questions about sizing, wholesale, or your order — we're here to help.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-brand-bg">
      {/* Hero */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-white/10" />
            <p className="font-body text-[10px] font-medium tracking-[0.4em] text-brand-muted uppercase">
              Get in Touch
            </p>
            <span className="h-px w-8 bg-white/10" />
          </div>
          <h1 className="font-heading font-bold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.04] mb-6">
            We&apos;d Love to Hear From You
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Sizing questions, wholesale enquiries, or just want to talk denim — our team responds within one business day.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
          {/* Form */}
          <div>
            <h2 className="font-heading font-semibold text-brand-text text-2xl mb-8">
              Send a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact details */}
          <aside className="space-y-5 lg:pt-14">
            <div className="border border-white/[0.08] bg-brand-surface p-8 space-y-6">
              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${brand.email}`}
                  className="font-body text-sm text-brand-text hover:text-white transition-colors"
                >
                  {brand.email}
                </a>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-2">
                  Response Time
                </p>
                <p className="font-body text-sm text-brand-muted">
                  Within one business day
                </p>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-2">
                  Wholesale
                </p>
                <p className="font-body text-sm text-brand-muted">
                  Minimum orders and trade pricing available. Mention wholesale in your message.
                </p>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-brand-muted uppercase mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {(
                    [
                      { label: "Instagram", href: brand.social.instagram },
                      { label: "Facebook", href: brand.social.facebook },
                      { label: "TikTok", href: brand.social.tiktok },
                      { label: "Pinterest", href: brand.social.pinterest },
                    ] as const
                  ).map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[10px] tracking-[0.15em] uppercase text-brand-muted border border-white/10 px-2.5 py-1.5 hover:text-brand-text hover:border-white/25 transition-colors duration-200"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
