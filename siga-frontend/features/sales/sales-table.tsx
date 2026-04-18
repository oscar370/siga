"use client";

import { DataTable } from "@/components/ui/data-table";
import { Link } from "@/components/ui/link";
import { LocalDate } from "@/components/ui/local-date";
import { useQueryParams } from "@/hooks/use-query-params";
import { SaleBasicDto } from "@/lib/client";
import { getSalesOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

const columns: ColumnDef<SaleBasicDto>[] = [
  {
    accessorKey: "referenceInvoice",
    header: "Factura",
    cell: ({ row }) => {
      const path = `/dashboard/sales/${row.original.id}`;
      const name = row.original.referenceInvoice;

      return <Link href={path}>{name}</Link>;
    },
  },
  {
    accessorKey: "operationDate",
    header: "Fecha de operación",
    cell: ({ row }) => <LocalDate date={row.original.operationDate} />,
  },
  {
    accessorKey: "totalAmount",
    header: "Cantidad",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (row.original.status === 0 ? "Completado" : "Cancelado"),
  },
];

export function SalesTable() {
  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const { data, isLoading, isFetching, isError } = useSuspenseQuery(
    getSalesOptions({
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
        <Link variant="outline" href={`/dashboard/sales/new`}>
          <Plus />
          Agregar
        </Link>
      }
    />
  );
}
