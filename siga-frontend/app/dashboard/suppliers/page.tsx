import { PageContainer } from "@/components/ui/page-container";
import { SuppliersTable } from "@/features/suppliers/suppliers-table";
import { getSuppliersOptions } from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function SuppliersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getSuppliersOptions({ query: initialQueryParams })
  );

  return (
    <PageContainer title="Proveedores">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SuppliersTable />
      </HydrationBoundary>
    </PageContainer>
  );
}
