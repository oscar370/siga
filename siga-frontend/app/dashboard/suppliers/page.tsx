import { PageContainer } from "@/components/ui/page-container";
import { SuppliersTable } from "@/features/suppliers/components/suppliers-table";

export default function Page() {
  return (
    <PageContainer title="Proveedores">
      <SuppliersTable />
    </PageContainer>
  );
}
