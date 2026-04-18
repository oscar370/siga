import { PageContainer } from "@/components/ui/page-container";
import { SupplierActionsHeader } from "@/features/suppliers/supplier-actions-header";
import { SupplierDetails } from "@/features/suppliers/supplier-details";
import {
  getPurchasesBySupplierOptions,
  getSupplierByIdOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { serverClient } from "@/lib/server-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupplierDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getSupplierByIdOptions({ client: serverClient, path: { id } })
    ),
    queryClient.prefetchQuery(
      getPurchasesBySupplierOptions({
        client: serverClient,
        path: { id },
        query: initialQueryParams,
      })
    ),
  ]);

  return (
    <PageContainer
      title="Detalles del proveedor"
      actions={<SupplierActionsHeader id={id} />}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SupplierDetails id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
