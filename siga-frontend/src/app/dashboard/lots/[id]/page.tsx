import { ErrorContent } from "@/components/ui/error-content";
import { PageContainer } from "@/components/ui/page-container";
import { LotDetails } from "@/features/lots/components/lot-details";
import { getLotById } from "@/services/lots/get-lot-by-id";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await getLotById(id);

  return (
    <PageContainer title="Detalles del lote">
      {!response.ok ? <ErrorContent /> : <LotDetails lot={response.data} />}
    </PageContainer>
  );
}
