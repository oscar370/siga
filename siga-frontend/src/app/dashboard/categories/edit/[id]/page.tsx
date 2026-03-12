import { PageContainer } from "@/components/ui/page-container";
import { EditCategory } from "@/features/categories/components/edit-category";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <PageContainer
      title="Editar categoría"
      classNames={{ content: "max-w-lg" }}
      isSubPage
    >
      <EditCategory id={id} />
    </PageContainer>
  );
}
