import { PageContainer } from "@/components/ui/page-container";
import { LotsTable } from "@/features/lots/lots-table";
import { getLotsOptions } from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function LotsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getLotsOptions({ query: initialQueryParams })
  );

  return (
    <PageContainer title="Lotes">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LotsTable />
      </HydrationBoundary>
    </PageContainer>
  );
}
