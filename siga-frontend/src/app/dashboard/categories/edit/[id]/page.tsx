import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { EditCategory } from "@/features/categories/components/edit-category";
import { getCategoryById } from "@/services/category/get-category-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getCategoryById(id);

  return (
    <PageContainer
      title="Editar categoría"
      classNames={{ content: "max-w-lg" }}
      isSubPage
    >
      {!response.ok ? (
        <ErrorContent />
      ) : (
        <EditCategory id={id} category={response.data} />
      )}
    </PageContainer>
  );
}
