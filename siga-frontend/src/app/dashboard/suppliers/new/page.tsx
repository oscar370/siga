import { PageContainer } from "@/components/ui/page-container";
import { NewSupplier } from "@/features/suppliers/components/new-supplier";

export default function Page() {
  return (
    <PageContainer
      title="Nuevo proveedor"
      classNames={{ content: "max-w-md" }}
      isSubPage
    >
      <NewSupplier />
    </PageContainer>
  );
}
