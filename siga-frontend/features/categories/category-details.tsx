"use client";

import { DataGroup, DataItem } from "@/components/ui/data-field";
import { DataTable } from "@/components/ui/data-table";
import { ErrorContent } from "@/components/ui/error-content";
import { useQueryParams } from "@/hooks/use-query-params";
import { ProductBasicDto } from "@/lib/client";
import {
  getCategoryByIdOptions,
  getProductsByCategoryOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const columns: ColumnDef<ProductBasicDto>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const path = `/dashboard/categories/${row.original.id}`;
      const name = row.original.name;

      return (
        <Link className="link" href={path}>
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
];

type CategoryDetailsProps = {
  id: string;
};

export function CategoryDetails({ id }: CategoryDetailsProps) {
  const { data: category, isError: isCategoryError } = useSuspenseQuery(
    getCategoryByIdOptions({ path: { id } })
  );

  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const {
    data: products,
    isLoading,
    isFetching,
    isError: isProductsError,
  } = useSuspenseQuery(
    getProductsByCategoryOptions({
      path: { id },
      query: {
        PageNumber: pagination.pageIndex + 1,
        PageSize: pagination.pageSize,
        SearchTerm: search,
      },
    })
  );

  if (isCategoryError) return <ErrorContent />;

  return (
    <DataGroup>
      <DataItem label="Nombre" value={category.name} />
      {category.description && (
        <DataItem label="Descripción" value={category.description} />
      )}

      <DataItem label="Products relacionados">
        <DataTable
          columns={columns}
          data={products.items}
          totalPages={Number(products.totalPages)}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isProductsError}
          pagination={pagination}
          onPaginationChange={setPagination}
          search={search}
          onSearchChange={handleSearchChange}
        />
      </DataItem>
    </DataGroup>
  );
}
