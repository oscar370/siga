import { PageContainer } from "@/components/ui/page-container";
import { UnityOfMeasureActionsHeader } from "@/features/units-of-measure/components/unity-of-measure-actions-header";
import { UnityOfMeasureDetails } from "@/features/units-of-measure/components/unity-of-measure-details";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <PageContainer
      title="Detalles de la unidad de medida"
      actions={<UnityOfMeasureActionsHeader id={id} />}
      isSubPage
    >
      <UnityOfMeasureDetails id={id} />
    </PageContainer>
  );
}
