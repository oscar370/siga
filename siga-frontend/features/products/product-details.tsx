"use client";

import { DataGroup, DataItem } from "@/components/ui/data-field";
import { DataTable } from "@/components/ui/data-table";
import { ErrorContent } from "@/components/ui/error-content";
import { Link } from "@/components/ui/link";
import { LocalDate } from "@/components/ui/local-date";
import { useQueryParams } from "@/hooks/use-query-params";
import { LotBasicDto } from "@/lib/client";
import {
  getLotsByProductOptions,
  getProductByIdOptions,
} from "@/lib/client/@tanstack/react-query.gen";
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

type ProductDetailsProps = {
  id: string;
};

export function ProductDetails({ id }: ProductDetailsProps) {
  const { data, isError } = useSuspenseQuery(
    getProductByIdOptions({ path: { id } })
  );

  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const {
    data: lots,
    isError: isLotsError,
    isLoading,
    isFetching,
  } = useSuspenseQuery(
    getLotsByProductOptions({
      path: { id },
      query: {
        PageNumber: pagination.pageIndex + 1,
        PageSize: pagination.pageSize,
        SearchTerm: search,
      },
    })
  );

  if (isError) return <ErrorContent />;

  return (
    <DataGroup>
      <DataItem label="Nombre" value={data.name} />

      <DataItem label="SKU" value={data.sku} />

      <DataItem label="Precio base" value={`$ ${data.basePrice}`} />

      <DataItem label="Categoría relacionada">
        <Link href={`/dashboard/categories/${data.categoryId}`}>
          {data.category.name}
        </Link>
      </DataItem>

      <DataItem label="Unidad de medida relacionada">
        <Link href={`/dashboard/units-of-measure/${data.unityOfMeasureId}`}>
          {data.unityOfMeasure.name}
        </Link>
      </DataItem>

      {data.description && (
        <DataItem label="Descripción" value={data.description} />
      )}

      <DataItem label="Lotes relacionados">
        <DataTable
          columns={columns}
          data={lots.items}
          totalPages={Number(lots.totalPages)}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isLotsError}
          pagination={pagination}
          onPaginationChange={setPagination}
          search={search}
          onSearchChange={handleSearchChange}
        />
      </DataItem>
    </DataGroup>
  );
}
