"use client";

import { DataTable } from "@/components/ui/data-table";
import { Link } from "@/components/ui/link";
import { useQueryParams } from "@/hooks/use-query-params";
import { ProductExtendedDto } from "@/lib/client";
import { getProductsOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

const columns: ColumnDef<ProductExtendedDto>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const path = `/dashboard/products/${row.original.id}`;
      const name = row.original.name;

      return <Link href={path}>{name}</Link>;
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "basePrice",
    header: "Precio base",
    cell: ({ row }) => `$ ${row.original.basePrice}`,
  },
  {
    accessorKey: "categoryId",
    header: "Categoría",
    cell: ({ row }) => row.original.category.name,
  },
  {
    accessorKey: "unityOfMeasureId",
    header: "Categoría",
    cell: ({ row }) => row.original.unityOfMeasure.name,
  },
];

export function ProductsTable() {
  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const { data, isLoading, isFetching, isError } = useSuspenseQuery(
    getProductsOptions({
      query: {
        PageNumber: pagination.pageIndex + 1,
        PageSize: pagination.pageSize,
        SearchTerm: search,
      },
    })
  );

  return (
    <DataTable
      columns={columns}
      data={data.items}
      totalPages={Number(data.totalPages)}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      pagination={pagination}
      onPaginationChange={setPagination}
      search={search}
      onSearchChange={handleSearchChange}
      actions={
        <Link variant="outline" href={`/dashboard/products/new`}>
          <Plus />
          Agregar
        </Link>
      }
    />
  );
}
