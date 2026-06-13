import { Metadata } from "next";
import { COMPANY_EMAIL } from "@/lib/constants";
import ContactForm from "@/components/ContactForm";
import { brand } from "@/config/branding";

export const metadata: Metadata = {
  title: "Contact Us — ByteFlow AI Labs",
  description:
    "Get in touch with ByteFlow AI Labs. Tell us about your automation needs and we'll be in touch within one business day.",
  openGraph: {
    title: "Contact ByteFlow AI Labs — Book a Free Consultation",
    description:
      "Tell us about your automation project. We scope it clearly, build it properly, and hand it over fully documented — within one business day response.",
    url: "/contact",
  },
  twitter: {
    title: "Contact ByteFlow AI Labs",
    description:
      "Book a free 30-min consultation. We'll map out exactly what we can automate for your business.",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-brand-bg">
      {/* Hero */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.10)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Get in Touch
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.08] mb-6">
            We&apos;d Love to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hear From You
            </span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Whether you have a project in mind or just a question, our team is ready to help.
          </p>
        </div>
      </section>

      {/* Calendly direct booking — shown only if NEXT_PUBLIC_CALENDLY_URL is set */}
      {process.env.NEXT_PUBLIC_CALENDLY_URL && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-8">
          <div className="border border-primary/20 bg-brand-surface p-8 text-center">
            <p className="font-body text-[10px] tracking-[0.35em] text-accent uppercase mb-3">
              Prefer to book directly?
            </p>
            <h2 className="font-heading font-semibold text-brand-text text-xl mb-4">
              Schedule a Free 30-Minute Consultation
            </h2>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 text-white font-body text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
            >
              Open Calendly →
            </a>
            <p className="font-body text-[11px] text-brand-muted/60 mt-4">
              Or fill in the form below and we&apos;ll reach out within one business day.
            </p>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          {/* Form */}
          <div>
            <h2 className="font-heading font-semibold text-brand-text text-2xl mb-8">
              Send a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact details */}
          <aside className="space-y-6 lg:pt-14">
            <div className="border border-primary/15 bg-brand-surface p-8 space-y-6">
              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="font-body text-sm text-brand-text hover:text-accent transition-colors"
                >
                  {COMPANY_EMAIL}
                </a>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
                  Response Time
                </p>
                <p className="font-body text-sm text-brand-muted">
                  Within one business day
                </p>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
                  Business Hours
                </p>
                <p className="font-body text-sm text-brand-muted">
                  Monday – Friday<br />
                  9:00 AM – 6:00 PM (GMT+6)
                </p>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.25em] text-accent uppercase mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {(
                    [
                      { label: "Facebook", href: brand.social.facebook },
                      { label: "LinkedIn", href: brand.social.linkedin },
                      { label: "Instagram", href: brand.social.instagram },
                      { label: "YouTube", href: brand.social.youtube },
                      { label: "X", href: brand.social.twitter },
                    ] as const
                  ).map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[10px] tracking-[0.15em] uppercase text-brand-muted border border-primary/15 px-2.5 py-1.5 hover:text-accent hover:border-accent/40 transition-colors duration-200"
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
