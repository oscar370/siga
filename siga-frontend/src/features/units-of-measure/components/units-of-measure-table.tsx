"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { DataTable } from "@/components/ui/table-app";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getUnitsOfMeasure } from "../../../services/get-units-of-measure";
import { columns } from "./columns";

export function UnitsOfMeasureTable() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["units-of-measure"],
    queryFn: getUnitsOfMeasure,
  });

  if (isPending) {
    return <SkeletonTable />;
  }

  if (isError) {
    return <ErrorContent />;
  }

  if (data)
    return (
      <DataTable
        data={data}
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
