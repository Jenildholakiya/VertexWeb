import { LegalLayout } from "@/components/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" subtitle="Last Updated: February 23, 2026">
      <div className="space-y-8">
        <section>
          <h2 className="text-white">1. Scope of Data Collection</h2>
          <p>VertexWeb collects personal identifiable information (PII) necessary to facilitate high-end digital services. This includes, but is not limited to:</p>
          <ul className="list-disc pl-5">
            <li>Contact Metadata: Name, email address, and LinkedIn profiles provided via discovery forms.</li>
            <li>Project Assets: Brand guidelines, source code access, and proprietary business logic shared for development.</li>
            <li>Technical Data: IP addresses and browser fingerprints collected via our internal analytics to optimize our "Motion Intelligence" systems.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white">2. Data Processing and Storage</h2>
          <p>We process data under the principle of "Minimalism." Your data is only stored on encrypted servers for the duration of the project lifecycle. Upon completion of a masterpiece, client data is archived for 12 months before permanent erasure, unless a maintenance retainer is active.</p>
        </section>

        <section>
          <h2 className="text-white">3. Third-Party Disclosure</h2>
          <p>VertexWeb does not sell, trade, or transfer your PII to outside parties. This excludes trusted third parties who assist us in operating our website (e.g., Vercel, AWS, Stripe) so long as those parties agree to keep this information confidential.</p>
        </section>

        <section>
          <h2 className="text-white">4. Your Rights and Compliance</h2>
          <p>In accordance with global standards (GDPR/CCPA), you have the right to request a full export of your data or immediate deletion. Requests must be sent to <strong>legal@vertexweb.in</strong> and will be processed within 7 business days.</p>
        </section>
      </div>
    </LegalLayout>
  );
}