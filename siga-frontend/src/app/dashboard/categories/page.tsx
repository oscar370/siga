import { PageContainer } from "@/components/ui/page-container";
import { CategoriesTable } from "@/features/categories/components/categories-table";

export default function Page() {
  return (
    <PageContainer title="Categorías">
      <CategoriesTable />
    </PageContainer>
  );
}
