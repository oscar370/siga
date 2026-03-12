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
import { UnityOfMeasureBasic } from "@/types/unity-of-measure/unity-of-measure-basic";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteUnityOfMeasure } from "./delete-unity-of-measure";

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
    cell: ({ row }) => {
      const path = `/dashboard/units-of-measure/${row.original.id}`;
      const name = row.original.name;

      return (
        <Button className="p-0 text-foreground" variant="link" asChild>
          <Link href={path}>{name}</Link>
        </Button>
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
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-full flex justify-center">
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                aria-label="Abrir menú"
              >
                <MoreHorizontal />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Button asChild variant="secondary">
                <Link
                  href={`/dashboard/units-of-measure/edit/${row.original.id}`}
                  aria-label="Editar"
                  className="cursor-pointer"
                >
                  <Pencil />
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem className="w-full *:w-full" asChild>
              <DeleteUnityOfMeasure
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
