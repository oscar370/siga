import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { ProductActionsHeader } from "@/features/products/components/product-actions-header";
import { ProductDetails } from "@/features/products/components/product-details";
import { getProductById } from "@/services/product/get-product-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getProductById(id);

  return (
    <PageContainer
      title="Detalles del producto"
      isSubPage
      actions={response.ok && <ProductActionsHeader id={id} />}
    >
      {!response.ok ? (
        <ErrorContent />
      ) : (
        <ProductDetails product={response.data} />
      )}
    </PageContainer>
  );
}
