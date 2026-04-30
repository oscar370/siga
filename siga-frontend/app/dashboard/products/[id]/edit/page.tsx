import { PageContainer } from "@/components/ui/page-container";
import { EditProduct } from "@/features/products/edit-product";
import {
  getCategoriesLookupOptions,
  getProductByIdOptions,
  getUnitsOfMeasureLookupOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getCategoriesLookupOptions({})),
    queryClient.prefetchQuery(getUnitsOfMeasureLookupOptions({})),
    queryClient.prefetchQuery(getProductByIdOptions({ path: { id } })),
  ]);

  return (
    <PageContainer title="Editar producto">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditProduct id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
