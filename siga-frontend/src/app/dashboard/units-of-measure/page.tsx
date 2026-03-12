import { PageContainer } from "@/components/ui/page-container";
import { UnitsOfMeasureTable } from "@/features/units-of-measure/components/units-of-measure-table";

export default function Page() {
  return (
    <PageContainer title="Unidades de medida">
      <UnitsOfMeasureTable />
    </PageContainer>
  );
}
