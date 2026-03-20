"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormattedDate } from "@/components/ui/formatted-date";
import { DataTableColumnHeader } from "@/components/ui/table-app";
import { PurchaseBasic } from "@/types/purchase/basic";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { CancelPurchase } from "./cancel-purchase";

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
    cell: ({ getValue }) => <FormattedDate value={getValue<string>()} />,
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
    cell: ({ row }) => {
      return row.original.status === 0 ? "Completada" : "Cancelada";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-full flex justify-center">
              <Button variant="ghost" aria-label="Abrir menú">
                <MoreHorizontal />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>

            <DropdownMenuItem className="w-full" asChild>
              <CancelPurchase
                classNames={{ trigger: "w-full" }}
                id={row.original.id.toString()}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
