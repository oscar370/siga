import { DataTable } from "@/components/ui/table-app";
import { PurchasesBasic } from "@/types/purchase/basic";
import { columns } from "./purchases-in-suppliers-columns";

type PurchasesInSuppliersTableProps = {
  purchases: PurchasesBasic;
};

export function PurchasesInSuppliersTable({
  purchases,
}: PurchasesInSuppliersTableProps) {
  return (
    <DataTable
      data={purchases}
      columns={columns}
      filterColumn="referenceInvoice"
      filterPlaceholder="Buscar por factura..."
    />
  );
}
