"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/table-app";
import { SupplierBasic } from "@/types/supplier";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<SupplierBasic>[] = [
  {
    accessorKey: "name",
    meta: { title: "Nombre" },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nombre" />;
    },
  },
  {
    accessorKey: "taxId",
    meta: { title: "RFC" },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="RFC" />;
    },
  },
  {
    accessorKey: "contactInfo",
    meta: { title: "Contacto" },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Contacto" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
