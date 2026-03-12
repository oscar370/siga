import { PageContainer } from "@/components/ui/page-container";
import { CategoryActionsHeader } from "@/features/categories/components/category-actions-header";
import { CategoryDetails } from "@/features/categories/components/category-details";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <PageContainer
      title="Detalles de la categoría"
      isSubPage
      actions={<CategoryActionsHeader id={id} />}
    >
      <CategoryDetails id={id} />
    </PageContainer>
  );
}
