import { Metadata } from "next";
import { COMPANY_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer — ByteFlow AI Labs",
  description: "Disclaimer for ByteFlow AI Labs — limitations of liability, AI output accuracy, and third-party service responsibilities.",
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

export default function DisclaimerPage() {
  return (
    <div className="bg-brand-bg">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px w-8 bg-primary/40" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
            Legal
          </p>
        </div>
        <h1 className="font-heading font-semibold text-brand-text text-5xl mb-3">Disclaimer</h1>
        <p className="font-body text-xs text-brand-muted mb-12">Last updated: June 2026</p>

        <div className="space-y-10">
          <Section title="1. General Information Only">
            <p>
              The information contained on this website is provided for general informational
              purposes only. It does not constitute professional legal, financial, or technical
              advice. You should not act upon any information on this Site without seeking
              independent professional advice relevant to your specific circumstances.
            </p>
          </Section>

          <Section title="2. AI and Automation Services">
            <p>
              While ByteFlow AI Labs takes reasonable care to ensure the accuracy of information
              describing our AI automation services, we cannot guarantee that all content is
              current, complete, or error-free. Technology capabilities and service offerings may
              evolve without notice.
            </p>
            <p>
              Results from AI automation implementations vary depending on existing infrastructure,
              data quality, and organisational processes. Any case studies, examples, or projected
              outcomes referenced on this Site are illustrative and do not constitute a guarantee
              of results for your specific use case.
            </p>
          </Section>

          <Section title="3. No Guarantee of Outcome">
            <p>
              Engaging our services does not guarantee a specific business outcome. The effectiveness
              of AI automation systems depends on factors outside our control, including data
              availability, third-party API reliability, organisational change management, and
              business conditions.
            </p>
          </Section>

          <Section title="4. Technical Accuracy">
            <p>
              Any technical specifications, integration details, or platform compatibility information
              referenced on this Site reflects our understanding at the time of publication.
              Third-party platforms and APIs change frequently; always verify compatibility with
              current documentation from the relevant vendor.
            </p>
          </Section>

          <Section title="5. External Links">
            <p>
              This Site may contain links to external websites. These links are provided for
              convenience only. ByteFlow AI Labs is not responsible for the content or
              accuracy of any external site.
            </p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, ByteFlow AI Labs expressly
              disclaims all warranties, express or implied, including but not limited to implied
              warranties of merchantability, fitness for a particular purpose, and non-infringement.
              We shall not be liable for any direct, indirect, incidental, or consequential loss
              arising from reliance on information provided on this Site.
            </p>
          </Section>

          <Section title="7. Contact">
            <p>
              For questions about this Disclaimer, please contact us at{" "}
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
