import { PageContainer } from "@/components/ui/page-container";
import { CategoryActionsHeader } from "@/features/categories/category-actions-header";
import { CategoryDetails } from "@/features/categories/category-details";
import {
  getCategoryByIdOptions,
  getProductsByCategoryOptions,
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

export default async function CategoryDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.prefetchQuery(getCategoryByIdOptions({ path: { id } })),
    await queryClient.prefetchQuery(
      getProductsByCategoryOptions({
        path: { id },
        query: initialQueryParams,
      })
    ),
  ]);

  return (
    <PageContainer
      title="Detalles de la categoría"
      actions={<CategoryActionsHeader id={id} />}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryDetails id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
