import { PageContainer } from "@/components/ui/page-container";
import { NewCategory } from "@/features/categories/components/new-category";

export default function Page() {
  return (
    <PageContainer
      title="Nueva categoría"
      classNames={{ content: "max-w-lg" }}
      isSubPage
    >
      <NewCategory />
    </PageContainer>
  );
}
