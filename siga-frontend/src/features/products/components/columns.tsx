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
import { ProductExtended } from "@/types/product/extended";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteProduct } from "./delete-product";

export const columns: ColumnDef<ProductExtended>[] = [
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
                  href={`/dashboard/products/edit/${row.original.id}`}
                  aria-label="Editar"
                  className="cursor-pointer"
                >
                  <Pencil />
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem className="w-full" asChild>
              <DeleteProduct
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
