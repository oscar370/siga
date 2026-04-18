"use client";

import { DataTable } from "@/components/ui/data-table";
import { Link } from "@/components/ui/link";
import { useQueryParams } from "@/hooks/use-query-params";
import { SupplierBasicDto } from "@/lib/client";
import { getSuppliersOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

const columns: ColumnDef<SupplierBasicDto>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const path = `/dashboard/suppliers/${row.original.id}`;
      const name = row.original.name;

      return <Link href={path}>{name}</Link>;
    },
  },
  {
    accessorKey: "taxId",
    header: "RFC",
  },
  {
    accessorKey: "contactInfo",
    header: "Información de contacto",
  },
];

export function SuppliersTable() {
  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const { data, isLoading, isFetching, isError } = useSuspenseQuery(
    getSuppliersOptions({
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
        <Link variant="outline" href={`/dashboard/suppliers/new`}>
          <Plus />
          Agregar
        </Link>
      }
    />
  );
}
