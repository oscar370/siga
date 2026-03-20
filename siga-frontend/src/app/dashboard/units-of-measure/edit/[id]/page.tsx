import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { EditUnityOfMeasure } from "@/features/units-of-measure/components/edit-unity-of-measure";
import { getUnityOfMeasureById } from "@/services/unity-of-measure/get-unity-of-measure-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getUnityOfMeasureById(id);

  return (
    <PageContainer
      title="Editar unidad de medida"
      classNames={{ content: "max-w-lg" }}
      isSubPage
    >
      {!response.ok ? (
        <ErrorContent />
      ) : (
        <EditUnityOfMeasure id={id} unityOfMeasure={response.data} />
      )}
    </PageContainer>
  );
}
