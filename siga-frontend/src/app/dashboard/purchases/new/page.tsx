import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { NewPurchase } from "@/features/purchase/components/new-purchase";
import { getProducts } from "@/services/product/get-products";
import { getSuppliers } from "@/services/supplier/get-suppliers";

export default async function Page() {
  const suppliersResponse = await getSuppliers();
  const productsResponse = await getProducts();
  const error = !suppliersResponse.ok || !productsResponse.ok;

  return (
    <PageContainer
      title="Nueva compra"
      classNames={{ content: "max-w-md" }}
      isSubPage
    >
      {error ? (
        <ErrorContent />
      ) : (
        <NewPurchase
          suppliers={suppliersResponse.data}
          products={productsResponse.data}
        />
      )}
    </PageContainer>
  );
}
