import { PageHeader } from "@/shared/components/ui/page-header";
import { CertificatesList } from "@/features/certificates/certificates-list";

export default function CertificatesPage() {
  return (
    <div className="w-full max-w-5xl">
      <PageHeader title="Certificados" />
      <CertificatesList />
    </div>
  );
}
