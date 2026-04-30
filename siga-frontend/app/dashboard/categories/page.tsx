import { PageContainer } from "@/components/ui/page-container";
import { CategoriesTable } from "@/features/categories/categories-table";
import { getCategoriesOptions } from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Categories() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getCategoriesOptions({ query: initialQueryParams })
  );

  return (
    <PageContainer title="Categorías">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoriesTable />
      </HydrationBoundary>
    </PageContainer>
  );
}
