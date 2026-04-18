import { PageContainer } from "@/components/ui/page-container";
import { UnityOfMeasureActionsHeader } from "@/features/units-of-measure/unity-of-measure-actions-header";
import { UnityOfMeasureDetails } from "@/features/units-of-measure/unity-of-measure-details";
import {
  getProductsByUnityOfMeasureOptions,
  getUnityOfMeasureByIdOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { serverClient } from "@/lib/server-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UnityOfMeasureDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.prefetchQuery(
      getUnityOfMeasureByIdOptions({ client: serverClient, path: { id } })
    ),
    await queryClient.prefetchQuery(
      getProductsByUnityOfMeasureOptions({
        client: serverClient,
        path: { id },
        query: initialQueryParams,
      })
    ),
  ]);

  return (
    <PageContainer
      title="Detalles de la unidad de medida"
      actions={<UnityOfMeasureActionsHeader id={id} />}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UnityOfMeasureDetails id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
