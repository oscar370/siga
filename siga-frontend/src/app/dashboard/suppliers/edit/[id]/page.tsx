import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { EditSupplier } from "@/features/suppliers/components/edit-supplier";
import { getSupplierById } from "@/services/supplier/get-supplier-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getSupplierById(id);

  return (
    <PageContainer
      title="Editar proveedor"
      classNames={{ content: "max-w-md" }}
      isSubPage
    >
      {!response.ok ? (
        <ErrorContent />
      ) : (
        <EditSupplier id={id} supplier={response.data} />
      )}
    </PageContainer>
  );
}
