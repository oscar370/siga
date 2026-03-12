"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { DataTable } from "@/components/ui/table-app";
import { getProducts } from "@/services/product/get-products";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

export function ProductsTable() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending) {
    return <SkeletonTable />;
  }

  if (isError) {
    return <ErrorContent />;
  }

  if (!data) return null;

  return (
    <DataTable
      data={data}
      columns={columns}
      filterColumn="name"
      filterPlaceholder="Buscar por nombre..."
      toolbarActions={
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/products/new">
            <Plus />
            <span>Agregar</span>
          </Link>
        </Button>
      }
    />
  );
}
