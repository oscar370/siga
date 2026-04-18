import { PageContainer } from "@/components/ui/page-container";
import { NewCategory } from "@/features/categories/new-category";

export default function NewCategoryPage() {
  return (
    <PageContainer title="Nueva categoría">
      <NewCategory />
    </PageContainer>
  );
}
