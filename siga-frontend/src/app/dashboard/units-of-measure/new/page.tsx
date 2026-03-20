import { PageContainer } from "@/components/ui/page-container";
import { NewUnityOfMeasure } from "@/features/units-of-measure/components/new-unity-of-measure";

export default function Page() {
  return (
    <PageContainer
      title="Nueva unidad de medida"
      classNames={{ content: "max-w-md" }}
      isSubPage
    >
      <NewUnityOfMeasure />
    </PageContainer>
  );
}
