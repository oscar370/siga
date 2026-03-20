import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { DataTable } from "@/components/ui/table-app";
import { getPurchases } from "@/services/purchase/get-purchases";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

export async function PurchasesTable() {
  const response = await getPurchases();

  if (!response.ok) return <ErrorContent />;

  return (
    <DataTable
      data={response.data}
      columns={columns}
      filterColumn="referenceInvoice"
      filterPlaceholder="Buscar por factura..."
      toolbarActions={
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/purchases/new">
            <Plus />
            <span>Agregar</span>
          </Link>
        </Button>
      }
    />
  );
}
