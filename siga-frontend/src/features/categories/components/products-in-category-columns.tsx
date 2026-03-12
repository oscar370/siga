"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/table-app";
import { ProductBasic } from "@/types/product/basic";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ProductBasic>[] = [
  {
    accessorKey: "name",
    meta: { title: "Nombre" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
    cell: ({ row }) => {
      const path = `/dashboard/products/${row.original.id}`;
      const name = row.original.name;

      return (
        <Button className="p-0 text-foreground" variant="link" asChild>
          <Link href={path}>{name}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "sku",
    meta: { title: "SKU" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
  },
  {
    accessorKey: "description",
    meta: { title: "Descripción" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
  },
  {
    accessorKey: "basePrice",
    meta: { title: "Precio base" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
    cell: ({ cell }) => `$ ${cell.getValue()}`,
  },
];
