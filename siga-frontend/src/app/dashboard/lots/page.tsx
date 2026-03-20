import { PageContainer } from "@/components/ui/page-container";
import { LotsTable } from "@/features/lots/components/lots-table";

export default async function Page() {
  return (
    <PageContainer title="Inventario">
      <LotsTable />
    </PageContainer>
  );
}
