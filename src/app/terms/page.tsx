import { Metadata } from "next";
import { COMPANY_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use — ByteFlow AI Labs",
  description: "Terms of Use for ByteFlow AI Labs — governing the use of our website and AI automation services.",
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

export default function TermsPage() {
  return (
    <div className="bg-brand-bg">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px w-8 bg-primary/40" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
            Legal
          </p>
        </div>
        <h1 className="font-heading font-semibold text-brand-text text-5xl mb-3">Terms of Use</h1>
        <p className="font-body text-xs text-brand-muted mb-12">Last updated: June 2026</p>

        <div className="space-y-10">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the ByteFlow AI Labs website (&ldquo;Site&rdquo;), you agree to be
              bound by these Terms of Use. If you do not agree, please do not use this Site.
            </p>
          </Section>

          <Section title="2. Use of the Site">
            <p>You agree to use this Site only for lawful purposes and in a manner that does not:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Infringe the rights of others</li>
              <li>Restrict or inhibit any other user&apos;s use of the Site</li>
              <li>Transmit any unsolicited commercial communications</li>
              <li>Introduce viruses, malware, or other harmful material</li>
            </ul>
          </Section>

          <Section title="3. Intellectual Property">
            <p>
              All content on this Site — including text, images, logos, and design — is the
              property of ByteFlow AI Labs or its content suppliers and is protected by
              applicable intellectual property laws. You may not reproduce, distribute, or create
              derivative works without our express written consent.
            </p>
          </Section>

          <Section title="4. Third-Party Services">
            <p>
              Our Site may include links to third-party websites or services. We are not responsible
              for the content, privacy practices, or terms of those third parties.
            </p>
          </Section>

          <Section title="5. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, ByteFlow AI Labs shall not be liable
              for any indirect, incidental, special, or consequential damages arising from your use
              of, or inability to use, this Site or its content.
            </p>
          </Section>

          <Section title="6. Amendments">
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the Site
              after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="7. Contact">
            <p>
              For questions about these Terms, please contact us at{" "}
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
