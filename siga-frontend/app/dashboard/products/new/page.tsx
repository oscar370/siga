import { PageContainer } from "@/components/ui/page-container";
import { NewProduct } from "@/features/products/new-product";
import {
  getCategoriesLookupOptions,
  getUnitsOfMeasureLookupOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function NewProductPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getCategoriesLookupOptions({})),
    queryClient.prefetchQuery(getUnitsOfMeasureLookupOptions({})),
  ]);

  return (
    <PageContainer title="Nuevo producto">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewProduct />
      </HydrationBoundary>
    </PageContainer>
  );
}
