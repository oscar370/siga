"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/table-app";
import { CategoryBasic } from "@/types/category/basic";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteCategory } from "./delete-category";

export const columns: ColumnDef<CategoryBasic>[] = [
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
      const path = `/dashboard/categories/${row.original.id}`;
      const name = row.original.name;

      return (
        <Button className="p-0 text-foreground" variant="link" asChild>
          <Link href={path}>{name}</Link>
        </Button>
      );
    },
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
                  href={`/dashboard/categories/edit/${row.original.id}`}
                  aria-label="Editar"
                  className="cursor-pointer"
                >
                  <Pencil />
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem className="w-full" asChild>
              <DeleteCategory
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
