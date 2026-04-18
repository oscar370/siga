import { PageContainer } from "@/components/ui/page-container";
import { EditCategory } from "@/features/categories/edit-category";
import { getCategoryByIdOptions } from "@/lib/client/@tanstack/react-query.gen";
import { serverClient } from "@/lib/server-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getCategoryByIdOptions({ client: serverClient, path: { id } })
  );

  return (
    <PageContainer title="Editar categoría">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditCategory id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
