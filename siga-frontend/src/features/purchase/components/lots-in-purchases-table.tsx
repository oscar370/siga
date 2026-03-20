import { DataTable } from "@/components/ui/table-app";
import { LotsBasic } from "@/types/lot/basic";
import { columns } from "./lots-in-purchases-columns";

type LotsInPurchasesTableProps = {
  lots: LotsBasic;
};

export function LotsInPurchasesTable({ lots }: LotsInPurchasesTableProps) {
  return (
    <DataTable
      data={lots}
      columns={columns}
      filterColumn="lotCode"
      filterPlaceholder="Buscar por lote..."
    />
  );
}
