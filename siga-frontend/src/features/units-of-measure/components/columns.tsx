"use client";

import { DataTableColumnHeader } from "@/components/ui/table-app";
import { UnityOfMeasureBasic } from "@/types/unity-of-measure";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UnityOfMeasureBasic>[] = [
  {
    accessorKey: "name",
    meta: { title: "Nombre" },
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.title || ""}
        />
      );
    },
  },
  {
    accessorKey: "abbreviation",
    meta: { title: "Abreviatura" },
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.title || ""}
        />
      );
    },
  },
];
