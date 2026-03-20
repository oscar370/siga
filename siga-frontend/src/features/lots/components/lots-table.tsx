import { ErrorContent } from "@/components/ui/error-content";
import { DataTable } from "@/components/ui/table-app";
import { getLots } from "@/services/lots/get-lots";
import { columns } from "./columns";

export async function LotsTable() {
  const response = await getLots();

  if (!response.ok) return <ErrorContent />;

  return (
    <DataTable
      data={response.data}
      columns={columns}
      filterColumn="lotCode"
      filterPlaceholder="Buscar por lote..."
    />
  );
}
