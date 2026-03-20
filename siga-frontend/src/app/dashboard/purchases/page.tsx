import { PageContainer } from "@/components/ui/page-container";
import { PurchasesTable } from "@/features/purchase/components/purchases-table";

export default async function Page() {
  return (
    <PageContainer title="Compras">
      <PurchasesTable />
    </PageContainer>
  );
}
