import { PageContainer } from "@/components/ui/page-container";
import { EditUnityOfMeasure } from "@/features/units-of-measure/edit-unity-of-measure";
import { getUnityOfMeasureByIdOptions } from "@/lib/client/@tanstack/react-query.gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditUnityOfMeasurePage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getUnityOfMeasureByIdOptions({ path: { id } })
  );

  return (
    <PageContainer title="Editar unidad de medida">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditUnityOfMeasure id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
