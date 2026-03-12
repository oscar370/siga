import { PageContainer } from "@/components/ui/page-container";
import { EditProduct } from "@/features/products/components/edit-product";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <PageContainer
      title="Editar producto"
      isSubPage
      classNames={{ content: "max-w-lg" }}
    >
      <EditProduct id={id} />
    </PageContainer>
  );
}
