import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { DataTable } from "@/components/ui/table-app";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getSuppliers } from "../../../services/supplier/get-suppliers";
import { columns } from "./columns";

export async function SuppliersTable() {
  const response = await getSuppliers();

  if (!response.ok) return <ErrorContent />;

  return (
    <DataTable
      data={response.data}
      columns={columns}
      filterColumn="name"
      filterPlaceholder="Buscar por nombre..."
      toolbarActions={
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/suppliers/new">
            <Plus />
            <span>Agregar</span>
          </Link>
        </Button>
      }
    />
  );
}
