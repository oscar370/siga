import { PageContainer } from "@/components/ui/page-container";
import { EditUnityOfMeasure } from "@/features/units-of-measure/components/edit-unity-of-measure";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <PageContainer
      title="Editar unidad de medida"
      classNames={{ content: "max-w-lg" }}
      isSubPage
    >
      <EditUnityOfMeasure id={id} />
    </PageContainer>
  );
}
