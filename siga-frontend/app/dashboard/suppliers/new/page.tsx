import { PageContainer } from "@/components/ui/page-container";
import { NewSupplier } from "@/features/suppliers/components/new-supplier";

export default function Page() {
  return (
    <PageContainer title="Nuevo proveedor" isSubPage>
      <NewSupplier />
    </PageContainer>
  );
}
