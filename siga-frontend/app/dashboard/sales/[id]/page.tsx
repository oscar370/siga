import { PageContainer } from "@/components/ui/page-container";
import { SaleActionsHeader } from "@/features/sales/sale-actions-header";
import { SaleDetails } from "@/features/sales/sale-details";
import {
  getSaleByIdOptions,
  getSaleDetailsBySaleOptions,
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

export default async function SaleDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getSaleByIdOptions({ path: { id } })),
    queryClient.prefetchQuery(
      getSaleDetailsBySaleOptions({ path: { id }, query: initialQueryParams })
    ),
  ]);

  return (
    <PageContainer
      title="Detalles de la venta"
      actions={<SaleActionsHeader id={id} />}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SaleDetails id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
