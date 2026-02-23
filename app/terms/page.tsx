import { LegalLayout } from "@/components/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" subtitle="Legal Framework for Digital Masterpieces">
      <div className="space-y-8">
        <section>
          <h2 className="text-white">1. Engagement and Retainers</h2>
          <p>Work at VertexWeb commences only after a signed Service Level Agreement (SLA) and a non-refundable commencement fee (50% of the total project value). We do not provide "speculative work" or unpaid trials.</p>
        </section>

        <section>
          <h2 className="text-white">2. Intellectual Property (IP) Rights</h2>
          <p>All design systems, custom codebases, and motion logic remain the property of VertexWeb until the final invoice is settled in full. VertexWeb reserves the right to display the project (e.g., MediGo, Dominare) in our portfolio and marketing materials as a "Masterpiece Case Study."</p>
        </section>

        <section>
          <h2 className="text-white">3. Revision Policy and Scope Creep</h2>
          <p>Each project phase includes two (2) rounds of revisions. Any requests outside the original Brand Brief (Scope Creep) will be billed at our standard hourly rate of $150/hr. Major structural changes after the "Design Approval" phase will reset project timelines.</p>
        </section>

        <section>
          <h2 className="text-white">4. Termination and Late Fees</h2>
          <p>Either party may terminate the agreement with 14 days' written notice. In the event of termination, the client is liable for all hours worked up to the termination date. Invoices overdue by 7 days will incur a 10% weekly compounding late fee.</p>
        </section>

        <section>
          <h2 className="text-white">5. Governing Law</h2>
          <p>These terms are governed by the laws of Gujarat, India. Any disputes shall be settled via arbitration in Rajkot, Gujarat.</p>
        </section>
      </div>
    </LegalLayout>
  );
}