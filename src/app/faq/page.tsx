import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — ByteFlow AI Labs",
  description:
    "Frequently asked questions about ByteFlow AI Labs' AI automation services, how we work, pricing structure, and what to expect from a project.",
  openGraph: {
    title: "FAQ — ByteFlow AI Labs",
    description:
      "Answers to common questions about our AI automation services, project process, pricing, and support.",
    url: "/faq",
  },
  twitter: {
    title: "FAQ — ByteFlow AI Labs",
    description:
      "Common questions about ByteFlow AI Labs automation services, how we work, and project expectations.",
  },
};

const faqs = [
  {
    q: "What does ByteFlow AI Labs actually do?",
    a: "We design, build, and deploy AI automation systems for businesses. This includes workflow automation (connecting apps and eliminating manual steps), AI-powered chatbots, custom data pipelines, and integrations between your existing tools and modern AI models.",
  },
  {
    q: "Who is a typical ByteFlow client?",
    a: "Small-to-medium businesses and startups that have identified repetitive processes costing them time or money. Common examples: teams manually moving data between tools, businesses answering the same customer questions repeatedly, or companies that want AI-powered insights from their existing data.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "No. We handle all the technical implementation. You describe the problem or outcome you want — we translate that into an automation system. We communicate in plain language throughout the engagement.",
  },
  {
    q: "What tools and platforms do you work with?",
    a: "We work across a broad stack: n8n, Make, Zapier for workflow automation; OpenAI, Anthropic Claude, Google Gemini for AI models; PostgreSQL, Supabase, Airtable for data; and custom Next.js / Python systems when off-the-shelf tools aren't the right fit.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused automation (one workflow, one integration) typically takes 1–2 weeks from scoping to deployment. A full AI system with multiple workflows, a custom chatbot, and a data pipeline typically runs 4–8 weeks. We'll give you a realistic timeline during the scoping call.",
  },
  {
    q: "How do you price your services?",
    a: "We price per project based on scope, not by the hour. You'll receive a fixed quote after an initial scoping call so there are no billing surprises. Ongoing maintenance retainers are available for clients who want continuous support.",
  },
  {
    q: "What happens after the automation is built?",
    a: "We document everything, walk your team through how it works, and hand over full ownership. If you'd like ongoing support — monitoring, updates, adding new steps — we offer monthly retainer packages.",
  },
  {
    q: "Will an automation break if a connected app changes its API?",
    a: "APIs do occasionally change. For clients on a maintenance retainer we monitor for breakage and fix issues proactively. For one-time project clients we provide a 30-day post-launch support window and can quote for longer-term coverage.",
  },
  {
    q: "Can you integrate with tools we've already built internally?",
    a: "Yes. If your internal tool has a REST API, webhook support, or a database we can read from, we can integrate it. We've connected custom CRMs, internal dashboards, and proprietary databases into automation workflows.",
  },
  {
    q: "How do I get started?",
    a: "Send us a message on our Contact page describing the process you want to automate. We'll reply within one business day to schedule a free 30-minute scoping call. No commitment required.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-brand-bg">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.07)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Help Centre
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-5xl sm:text-6xl leading-[1.08] mb-6">
            Frequently Asked<br />
            <span className="text-accent">Questions</span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed">
            Can&apos;t find what you need?{" "}
            <Link href="/contact" className="text-accent hover:underline">
              Contact us directly.
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-24">
        <div className="divide-y divide-primary/10 border-t border-primary/10">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-start justify-between gap-4">
                <span className="font-heading font-semibold text-brand-text text-lg leading-snug">
                  {item.q}
                </span>
                <span className="text-accent text-xl shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-sm text-brand-muted leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
