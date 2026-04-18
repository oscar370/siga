"use client";

import { DataGroup, DataItem } from "@/components/ui/data-field";
import { DataTable } from "@/components/ui/data-table";
import { ErrorContent } from "@/components/ui/error-content";
import { Link } from "@/components/ui/link";
import { LocalDate } from "@/components/ui/local-date";
import { useQueryParams } from "@/hooks/use-query-params";
import { SaleDetailsBasicDto } from "@/lib/client";
import {
  getSaleByIdOptions,
  getSaleDetailsBySaleOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

type SaleDetailsProps = {
  id: string;
};

const columns: ColumnDef<SaleDetailsBasicDto>[] = [
  {
    accessorKey: "productId",
    header: "Producto",
    cell: ({ row }) => {
      const path = `/dashboard/products/${row.original.productId}`;
      const name = row.original.product.name;

      return <Link href={path}>{name}</Link>;
    },
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => `$ ${row.original.subtotal}`,
  },
  {
    accessorKey: "quantityRequested",
    header: "Cantidad solicitada",
    cell: ({ row }) => row.original.quantityRequested,
  },
  {
    accessorKey: "unitSellingPrice",
    header: "Precio de venta unitario",
    cell: ({ row }) => `$ ${row.original.unitSellingPrice}`,
  },
];

export function SaleDetails({ id }: SaleDetailsProps) {
  const { data: sales, isError: isSalesError } = useSuspenseQuery(
    getSaleByIdOptions({ path: { id } })
  );

  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const {
    data: saleDetails,
    isError: isSaleDetailsError,
    isLoading,
    isFetching,
  } = useSuspenseQuery(
    getSaleDetailsBySaleOptions({
      path: { id },
      query: {
        PageNumber: pagination.pageIndex + 1,
        PageSize: pagination.pageSize,
        SearchTerm: search,
      },
    })
  );

  if (isSalesError) return <ErrorContent />;

  return (
    <DataGroup>
      <DataItem
        label="Referencia de la factura"
        value={sales.referenceInvoice}
      />

      <DataItem label="Fecha">
        <LocalDate date={sales.operationDate} />
      </DataItem>

      <DataItem
        label="Precio base"
        value={sales.status === 0 ? "Completada" : "Cancelada"}
      />

      <DataItem label="Usuario relacionado" value={sales.user.fullName} />

      <DataItem label="Detalles de la venta">
        <DataTable
          columns={columns}
          data={saleDetails.items}
          totalPages={Number(saleDetails.totalPages)}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isSaleDetailsError}
          pagination={pagination}
          onPaginationChange={setPagination}
          search={search}
          onSearchChange={handleSearchChange}
        />
      </DataItem>
    </DataGroup>
  );
}
