import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { UnityOfMeasureActionsHeader } from "@/features/units-of-measure/components/unity-of-measure-actions-header";
import { UnityOfMeasureDetails } from "@/features/units-of-measure/components/unity-of-measure-details";
import { getUnityOfMeasureById } from "@/services/unity-of-measure/get-unity-of-measure-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getUnityOfMeasureById(id);

  return (
    <PageContainer
      title="Detalles de la unidad de medida"
      actions={response.ok && <UnityOfMeasureActionsHeader id={id} />}
      isSubPage
    >
      {!response.ok ? (
        <ErrorContent />
      ) : (
        <UnityOfMeasureDetails unityOfMeasure={response.data} />
      )}
    </PageContainer>
  );
}
