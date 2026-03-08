"use client";

import { DataTableColumnHeader } from "@/components/ui/table-app";
import { ProductExtended } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductExtended>[] = [
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
    accessorKey: "sku",
    meta: { title: "SKU" },
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
    accessorKey: "description",
    meta: { title: "Descripción" },
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
    accessorKey: "basePrice",
    meta: { title: "Precio base" },
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={column.columnDef.meta?.title || ""}
        />
      );
    },
    cell: ({ cell }) => `$ ${cell.getValue()}`,
  },
  {
    accessorKey: "category.name",
    meta: { title: "Categoría" },
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
    accessorKey: "unityOfMeasure.name",
    meta: { title: "Unidad de medida" },
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
