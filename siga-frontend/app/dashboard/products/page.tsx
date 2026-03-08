import { PageContainer } from "@/components/ui/page-container";
import { ProductsTable } from "@/features/products/components/products-table";

export default function Page() {
  return (
    <PageContainer title="Products">
      <ProductsTable />
    </PageContainer>
  );
}
