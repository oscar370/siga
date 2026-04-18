import { PageContainer } from "@/components/ui/page-container";
import { UnitsOfMeasureTable } from "@/features/units-of-measure/units-of-measure-table";
import { getUnitsOfMeasureOptions } from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { serverClient } from "@/lib/server-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function UnitsOfMeasurePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getUnitsOfMeasureOptions({
      client: serverClient,
      query: initialQueryParams,
    })
  );

  return (
    <PageContainer title="Unidades de medida">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UnitsOfMeasureTable />
      </HydrationBoundary>
    </PageContainer>
  );
}
