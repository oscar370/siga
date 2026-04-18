import { PageContainer } from "@/components/ui/page-container";
import { ProductActionsHeader } from "@/features/products/product-actions-header";
import { ProductDetails } from "@/features/products/product-details";
import { getProductByIdOptions } from "@/lib/client/@tanstack/react-query.gen";
import { serverClient } from "@/lib/server-client";
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

  await queryClient.prefetchQuery(
    getProductByIdOptions({ client: serverClient, path: { id } })
  );

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
