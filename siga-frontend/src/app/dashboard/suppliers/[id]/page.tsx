import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { SupplierActionsHeader } from "@/features/suppliers/components/supplier-actions-header";
import { SupplierDetails } from "@/features/suppliers/components/supplier-details";
import { getSupplierById } from "@/services/supplier/get-supplier-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getSupplierById(id);

  return (
    <PageContainer
      title="Detalles del proveedor"
      actions={response.ok && <SupplierActionsHeader id={id} />}
      isSubPage
    >
      {!response.ok ? (
        <ErrorContent />
      ) : (
        <SupplierDetails supplier={response.data} />
      )}
    </PageContainer>
  );
}
