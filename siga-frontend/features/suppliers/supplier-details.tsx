"use client";

import { DataGroup, DataItem } from "@/components/ui/data-field";
import { DataTable } from "@/components/ui/data-table";
import { ErrorContent } from "@/components/ui/error-content";
import { Link } from "@/components/ui/link";
import { useQueryParams } from "@/hooks/use-query-params";
import { PurchaseBasicDto } from "@/lib/client";
import {
  getPurchasesBySupplierOptions,
  getSupplierByIdOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<PurchaseBasicDto>[] = [
  {
    accessorKey: "referenceInvoice",
    header: "Factura",
    cell: ({ row }) => {
      const path = `/dashboard/purchases/${row.original.id}`;
      const name = row.original.referenceInvoice;

      return <Link href={path}>{name}</Link>;
    },
  },
  {
    accessorKey: "operationDate",
    header: "Fecha de operación",
  },
  {
    accessorKey: "totalAmount",
    header: "Cantidad",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
];

type SupplierDetailsProps = {
  id: string;
};

export function SupplierDetails({ id }: SupplierDetailsProps) {
  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const { data: supplier, isError: isSupplierError } = useSuspenseQuery(
    getSupplierByIdOptions({ path: { id } })
  );

  const {
    data: purchases,
    isError: isPurchasesError,
    isLoading,
    isFetching,
  } = useSuspenseQuery(
    getPurchasesBySupplierOptions({
      path: { id },
      query: {
        PageNumber: pagination.pageIndex + 1,
        PageSize: pagination.pageSize,
        SearchTerm: search,
      },
    })
  );

  if (isSupplierError) return <ErrorContent />;

  return (
    <DataGroup>
      <DataItem label="Nombre" value={supplier.name} />

      <DataItem label="RFC" value={supplier.taxId} />

      {supplier.contactInfo && (
        <DataItem
          label="Información de contacto"
          value={supplier.contactInfo}
        />
      )}

      <DataItem label="Compras relacionadas">
        <DataTable
          columns={columns}
          data={purchases.items}
          totalPages={Number(purchases.totalPages)}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isPurchasesError}
          pagination={pagination}
          onPaginationChange={setPagination}
          search={search}
          onSearchChange={handleSearchChange}
        />
      </DataItem>
    </DataGroup>
  );
}
