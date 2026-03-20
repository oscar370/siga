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
import { LotBasic } from "@/types/lot/basic";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
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
    meta: { title: "Costo unitario" },
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
            <DropdownMenuItem asChild>
              <Button asChild variant="secondary">
                <Link
                  href={`/dashboard/lots/edit/${row.original.id}`}
                  aria-label="Editar"
                  className="cursor-pointer"
                >
                  <Pencil />
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem className="w-full" asChild></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
