import { PageContainer } from "@/components/ui/page-container";
import { NewProduct } from "@/features/products/components/new-product";

export default function Page() {
  return (
    <PageContainer title="Nuevo producto" isSubPage>
      <NewProduct />
    </PageContainer>
  );
}
