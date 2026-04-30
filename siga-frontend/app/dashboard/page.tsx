import { PageContainer } from "@/components/ui/page-container";
import { FinancialSummary } from "@/features/analytics/financial-summary";
import { RecentTransactions } from "@/features/analytics/recent-transactions";
import { getRecentTransactionsOptions } from "@/lib/client/@tanstack/react-query.gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Dashboard() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getRecentTransactionsOptions()),
  ]);

  return (
    <PageContainer title="Inicio">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="space-y-4">
          <FinancialSummary />
          <RecentTransactions />
        </div>
      </HydrationBoundary>
    </PageContainer>
  );
}
