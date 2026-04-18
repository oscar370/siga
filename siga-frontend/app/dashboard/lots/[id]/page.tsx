import { PageContainer } from "@/components/ui/page-container";
import { LotDetails } from "@/features/lots/lot-details";
import { getPurchaseByIdOptions } from "@/lib/client/@tanstack/react-query.gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LotDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getPurchaseByIdOptions({ path: { id } }));

  return (
    <PageContainer title="Detalles del lote">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LotDetails id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
