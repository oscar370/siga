import { PageContainer } from "@/components/ui/page-container";
import { ProductActionsHeader } from "@/features/products/components/product-actions-header";
import { ProductDetails } from "@/features/products/components/product-details";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <PageContainer
      title="Detalles del producto"
      isSubPage
      actions={<ProductActionsHeader id={id} />}
    >
      <ProductDetails id={id} />
    </PageContainer>
  );
}
