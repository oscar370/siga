import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { NewProduct } from "@/features/products/components/new-product";
import { getCategories } from "@/services/category/get-categories";
import { getUnitsOfMeasure } from "@/services/unity-of-measure/get-units-of-measure";

export default async function Page() {
  const [categoriesResponse, unitsOfMeasureResponse] = await Promise.all([
    getCategories(),
    getUnitsOfMeasure(),
  ]);

  return (
    <PageContainer
      title="Nuevo producto"
      classNames={{ content: "max-w-md" }}
      isSubPage
    >
      {!categoriesResponse.ok || !unitsOfMeasureResponse.ok ? (
        <ErrorContent />
      ) : (
        <NewProduct
          categories={categoriesResponse.data}
          unitsOfMeasure={unitsOfMeasureResponse.data}
        />
      )}
    </PageContainer>
  );
}
