import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { DataTable } from "@/components/ui/table-app";
import { getUnitsOfMeasure } from "@/services/unity-of-measure/get-units-of-measure";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

export async function UnitsOfMeasureTable() {
  const response = await getUnitsOfMeasure();

  if (!response.ok) return <ErrorContent />;

  return (
    <DataTable
      data={response.data}
      columns={columns}
      filterColumn="name"
      filterPlaceholder="Buscar por nombre..."
      toolbarActions={
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/units-of-measure/new">
            <Plus />
            <span>Agregar</span>
          </Link>
        </Button>
      }
    />
  );
}
