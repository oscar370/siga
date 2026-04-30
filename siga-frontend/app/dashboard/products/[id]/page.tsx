import { PageContainer } from "@/components/ui/page-container";
import { ProductActionsHeader } from "@/features/products/product-actions-header";
import { ProductDetails } from "@/features/products/product-details";
import {
  getLotsByProductOptions,
  getProductByIdOptions,
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

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getProductByIdOptions({ path: { id } })),
    queryClient.prefetchQuery(
      getLotsByProductOptions({
        path: { id },
        query: initialQueryParams,
      })
    ),
  ]);

  return (
    <PageContainer
      title="Detalles del producto"
      actions={<ProductActionsHeader id={id} />}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetails id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
