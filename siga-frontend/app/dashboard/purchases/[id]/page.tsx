import { PageContainer } from "@/components/ui/page-container";
import { PurchaseActionsHeader } from "@/features/purchases/purchase-actions-header";
import { PurchaseDetails } from "@/features/purchases/purchase-details";
import {
  getLotsByPurchaseOptions,
  getPurchaseByIdOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PurchaseDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getPurchaseByIdOptions({ path: { id } })),
    queryClient.prefetchQuery(
      getLotsByPurchaseOptions({
        path: { id },
        query: initialQueryParams,
      })
    ),
  ]);

  return (
    <PageContainer
      title="Detalles de la compra"
      actions={<PurchaseActionsHeader id={id} />}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PurchaseDetails id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
