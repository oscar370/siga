import { PageContainer } from "@/components/ui/page-container";
import { EditSupplier } from "@/features/suppliers/edit-supplier";
import { getSupplierByIdOptions } from "@/lib/client/@tanstack/react-query.gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditSupplierPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getSupplierByIdOptions({ path: { id } }));

  return (
    <PageContainer title="Editar proveedor">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditSupplier id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
