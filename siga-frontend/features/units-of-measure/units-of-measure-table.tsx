"use client";

import { DataTable } from "@/components/ui/data-table";
import { Link } from "@/components/ui/link";
import { useQueryParams } from "@/hooks/use-query-params";
import { UnityOfMeasureBasicDto } from "@/lib/client";
import { getUnitsOfMeasureOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

const columns: ColumnDef<UnityOfMeasureBasicDto>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const path = `/dashboard/units-of-measure/${row.original.id}`;
      const name = row.original.name;

      return <Link href={path}>{name}</Link>;
    },
  },
  {
    accessorKey: "abbreviation",
    header: "Abreviatura",
  },
];

export function UnitsOfMeasureTable() {
  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const { data, isLoading, isFetching, isError } = useSuspenseQuery(
    getUnitsOfMeasureOptions({
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
        <Link variant="outline" href={`/dashboard/units-of-measure/new`}>
          <Plus />
          Agregar
        </Link>
      }
    />
  );
}
