import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { CategoryActionsHeader } from "@/features/categories/components/category-actions-header";
import { CategoryDetails } from "@/features/categories/components/category-details";
import { getCategoryById } from "@/services/category/get-category-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getCategoryById(id);

  return (
    <PageContainer
      title="Detalles de la categoría"
      isSubPage
      actions={response.ok && <CategoryActionsHeader id={id} />}
    >
      {!response.ok ? (
        <ErrorContent />
      ) : (
        <CategoryDetails category={response.data} />
      )}
    </PageContainer>
  );
}
