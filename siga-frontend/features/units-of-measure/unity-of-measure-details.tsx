"use client";

import { DataGroup, DataItem } from "@/components/ui/data-field";
import { DataTable } from "@/components/ui/data-table";
import { ErrorContent } from "@/components/ui/error-content";
import { Link } from "@/components/ui/link";
import { useQueryParams } from "@/hooks/use-query-params";
import { ProductBasicDto } from "@/lib/client";
import {
  getProductsByUnityOfMeasureOptions,
  getUnityOfMeasureByIdOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<ProductBasicDto>[] = [
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
    accessorKey: "description",
    header: "Descripción",
  },
];

type UnityOfMeasureDetailsProps = {
  id: string;
};

export function UnityOfMeasureDetails({ id }: UnityOfMeasureDetailsProps) {
  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const { data: unitOfMeasure, isError: isUnitOfMeasureError } =
    useSuspenseQuery(getUnityOfMeasureByIdOptions({ path: { id } }));

  const {
    data: products,
    isError: isProductsError,
    isLoading,
    isFetching,
  } = useSuspenseQuery(
    getProductsByUnityOfMeasureOptions({
      path: { id },
      query: {
        PageNumber: pagination.pageIndex + 1,
        PageSize: pagination.pageSize,
        SearchTerm: search,
      },
    })
  );

  if (isUnitOfMeasureError) return <ErrorContent />;

  return (
    <DataGroup>
      <DataItem label="Nombre" value={unitOfMeasure.name} />

      <DataItem label="Descripción" value={unitOfMeasure.abbreviation} />

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
