import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { PurchaseActionsHeader } from "@/features/purchase/components/purchase-actions-header";
import { PurchaseDetails } from "@/features/purchase/components/purchase-details";
import { getPurchaseById } from "@/services/purchase/get-purchase-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getPurchaseById(id);

  return (
    <PageContainer
      title="Detalles de la compra"
      isSubPage
      actions={response.ok && <PurchaseActionsHeader id={id} />}
    >
      {!response.ok ? (
        <ErrorContent />
      ) : (
        <PurchaseDetails purchase={response.data} />
      )}
    </PageContainer>
  );
}
