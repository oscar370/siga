import { PageContainer } from "@/components/ui/page-container";
import { SalesTable } from "@/features/sales/sales-table";
import { getSalesOptions } from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function SalesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getSalesOptions({ query: initialQueryParams })
  );

  return (
    <PageContainer title="Ventas">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SalesTable />
      </HydrationBoundary>
    </PageContainer>
  );
}
