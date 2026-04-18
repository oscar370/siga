import { PageContainer } from "@/components/ui/page-container";
import { NewProduct } from "@/features/products/new-product";
import {
  getCategoriesLookupOptions,
  getUnitsOfMeasureLookupOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { serverClient } from "@/lib/server-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function NewProductPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getCategoriesLookupOptions({ client: serverClient })
    ),
    queryClient.prefetchQuery(
      getUnitsOfMeasureLookupOptions({ client: serverClient })
    ),
  ]);

  return (
    <PageContainer title="Nuevo producto">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewProduct />
      </HydrationBoundary>
    </PageContainer>
  );
}
