import { PageContainer } from "@/components/ui/page-container";
import { PurchasesTable } from "@/features/purchases/purchases-table";
import { getPurchasesOptions } from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function PurchasesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getPurchasesOptions({ query: initialQueryParams })
  );

  return (
    <PageContainer title="Compras">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PurchasesTable />
      </HydrationBoundary>
    </PageContainer>
  );
}
