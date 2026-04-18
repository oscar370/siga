"use client";

import { DataTable } from "@/components/ui/data-table";
import { Link } from "@/components/ui/link";
import { LocalDate } from "@/components/ui/local-date";
import { useQueryParams } from "@/hooks/use-query-params";
import { LotBasicDto } from "@/lib/client";
import { getLotsOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<LotBasicDto>[] = [
  {
    accessorKey: "lotCode",
    header: "Código del lote",
    cell: ({ row }) => {
      const path = `/dashboard/lots/${row.original.id}`;
      const name = row.original.lotCode;

      return <Link href={path}>{name}</Link>;
    },
  },
  {
    accessorKey: "productId",
    header: "Producto",
    cell: ({ row }) => row.original.product.name,
  },
  {
    accessorKey: "entryDate",
    header: "Fecha",
    cell: ({ row }) => <LocalDate date={row.original.entryDate} />,
  },
  {
    accessorKey: "unitCost",
    header: "Costo unitario",
    cell: ({ row }) => `$ ${row.original.unitCost}`,
  },
  {
    accessorKey: "availableQuantity",
    header: "Cantidad disponible",
  },
];

export function LotsTable() {
  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const { data, isLoading, isFetching, isError } = useSuspenseQuery(
    getLotsOptions({
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
    />
  );
}
