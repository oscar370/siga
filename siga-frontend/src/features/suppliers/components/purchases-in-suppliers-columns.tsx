"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/table-app";
import { PurchaseBasic } from "@/types/purchase/basic";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<PurchaseBasic>[] = [
  {
    accessorKey: "referenceInvoice",
    meta: { title: "Factura" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
    cell: ({ row }) => {
      const path = `/dashboard/purchases/${row.original.id}`;
      const name = row.original.referenceInvoice;

      return (
        <Button
          disabled={row.original.status === 1}
          className="p-0 text-foreground"
          variant="link"
          asChild
        >
          <Link href={path}>{name}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "operationDate",
    meta: { title: "Fecha" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
  },
  {
    accessorKey: "status",
    meta: { title: "Estado" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={column.columnDef.meta?.title || ""}
      />
    ),
  },
];
