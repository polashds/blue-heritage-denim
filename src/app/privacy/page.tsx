import { Metadata } from "next";
import { COMPANY_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy — ByteFlow AI Labs",
  description: "Privacy Policy for ByteFlow AI Labs — how we collect, use, and protect your personal information.",
  robots: { index: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-heading font-semibold text-brand-text text-xl">{title}</h2>
      <div className="font-body text-sm text-brand-muted leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-brand-bg">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px w-8 bg-primary/40" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
            Legal
          </p>
        </div>
        <h1 className="font-heading font-semibold text-brand-text text-5xl mb-3">Privacy Policy</h1>
        <p className="font-body text-xs text-brand-muted mb-12">Last updated: June 2026</p>

        <div className="space-y-10">
          <Section title="1. Introduction">
            <p>
              ByteFlow AI Labs (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your
              personal information. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or engage with our services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              We collect personal information only when you actively provide it to us. Depending on
              how you contact us, this may include:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong className="text-brand-text">Name</strong> — so we know who we&apos;re speaking with
              </li>
              <li>
                <strong className="text-brand-text">Phone number</strong> — for follow-up calls or messages
              </li>
              <li>
                <strong className="text-brand-text">Email address</strong> — if you choose to provide one
              </li>
              <li>
                <strong className="text-brand-text">Your message</strong> — the enquiry or question you submitted
              </li>
            </ul>
            <p>We collect this information through three channels:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong className="text-brand-text">Contact form</strong> — the enquiry form on our website
              </li>
              <li>
                <strong className="text-brand-text">Website chatbot</strong> — if you share your name and phone while chatting with our AI assistant
              </li>
            </ul>
            <p>
              We also collect anonymous usage data (pages visited, time on site, referral source)
              via analytics tools. This data cannot be used to identify you personally.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use your information solely to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Respond to your enquiry by phone or email</li>
              <li>Follow up with relevant information you requested</li>
              <li>Improve our website and service quality</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do not sell your personal information. We do not send unsolicited marketing.</p>
            <p>
              <strong className="text-brand-text">Third-party processors.</strong> To operate our
              business, your data may pass through the following services, each bound by their own
              privacy policies:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong className="text-brand-text">Automation tools</strong> — we use workflow automation software (such as n8n) to route your enquiry to our team and log it in our CRM. These tools process your data on our behalf and do not use it for any other purpose.
              </li>
            </ul>
          </Section>

          <Section title="4. Data Retention">
            <p>
              We keep enquiry records — including name, phone, email, and message — for{" "}
              <strong className="text-brand-text">24 months</strong> from the date of submission.
              After that period, records are deleted unless we are required by law to keep them
              longer or an ongoing business relationship exists.
            </p>
            <p>
              Anonymous analytics data does not contain personal information and is retained
              according to the terms of the analytics provider.
            </p>
          </Section>

          <Section title="5. Your Rights &amp; Data Deletion">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>
                <strong className="text-brand-text">Request deletion of your data</strong> — we
                will remove your records within 14 days of a verified request, subject to any legal
                obligations to retain them
              </li>
              <li>Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p>
              To exercise any of these rights — including requesting deletion — email us at{" "}
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-accent hover:underline">
                {COMPANY_EMAIL}
              </a>{" "}
              with the subject line <em>&ldquo;Data Request&rdquo;</em>. Please include the name and
              contact details you used when submitting your enquiry so we can locate your record.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              Our website may use cookies to enhance your browsing experience. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is being sent. Please note
              that some features of our website may not function properly without cookies.
            </p>
          </Section>

          <Section title="7. Third-Party Links">
            <p>
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices of those websites and encourage you to review their privacy policies.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with a revised &ldquo;Last updated&rdquo; date. Your continued use of our website following any
              changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              For questions or concerns about this Privacy Policy, please contact us at{" "}
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-accent hover:underline">
                {COMPANY_EMAIL}
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
