import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { EditProduct } from "@/features/products/components/edit-product";
import { getCategories } from "@/services/category/get-categories";
import { getProductById } from "@/services/product/get-product-by-id";
import { getUnitsOfMeasure } from "@/services/unity-of-measure/get-units-of-measure";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [productResponse, categoriesResponse, unitsOfMeasureResponse] =
    await Promise.all([
      getProductById(id),
      getCategories(),
      getUnitsOfMeasure(),
    ]);
  const error =
    !productResponse.ok || !categoriesResponse.ok || !unitsOfMeasureResponse.ok;

  return (
    <PageContainer
      title="Editar producto"
      isSubPage
      classNames={{ content: "max-w-lg" }}
    >
      {error ? (
        <ErrorContent />
      ) : (
        <EditProduct
          id={id}
          product={productResponse.data}
          categories={categoriesResponse.data}
          unitsOfMeasure={unitsOfMeasureResponse.data}
        />
      )}
    </PageContainer>
  );
}
