"use client";

import { Button } from "@/components/ui/button";
import { FormattedDate } from "@/components/ui/formatted-date";
import { DataTableColumnHeader } from "@/components/ui/table-app";
import { LotBasic } from "@/types/lot/basic";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<LotBasic>[] = [
  {
    accessorKey: "lotCode",
    meta: { title: "Código del lote" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
    cell: ({ row }) => {
      const path = `/dashboard/lots/${row.original.id}`;
      const name = row.original.lotCode;

      return (
        <Button className="p-0 text-foreground" variant="link" asChild>
          <Link href={path}>{name}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "entryDate",
    meta: { title: "Fecha" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
    cell: ({ row }) => <FormattedDate value={row.original.entryDate} />,
  },
  {
    accessorKey: "unitCost",
    meta: { title: "Cost unitario" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
    cell: ({ row }) => `$ ${row.original.unitCost}`,
  },
  {
    accessorKey: "availableQuantity",
    meta: { title: "Cantidad disponible" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
  },
];
