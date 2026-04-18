"use client";

import { DataGroup, DataItem } from "@/components/ui/data-field";
import { DataTable } from "@/components/ui/data-table";
import { ErrorContent } from "@/components/ui/error-content";
import { Link } from "@/components/ui/link";
import { LocalDate } from "@/components/ui/local-date";
import { useQueryParams } from "@/hooks/use-query-params";
import { LotBasicDto } from "@/lib/client";
import {
  getLotsByPurchaseOptions,
  getPurchaseByIdOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

type PurchaseDetailsProps = {
  id: string;
};

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

export function PurchaseDetails({ id }: PurchaseDetailsProps) {
  const { data: purchase, isError: isPurchaseError } = useSuspenseQuery(
    getPurchaseByIdOptions({ path: { id } })
  );

  const { pagination, search, setPagination, handleSearchChange } =
    useQueryParams();

  const {
    data: lots,
    isError: isLotsError,
    isLoading,
    isFetching,
  } = useSuspenseQuery(
    getLotsByPurchaseOptions({
      path: { id },
      query: {
        PageNumber: pagination.pageIndex + 1,
        PageSize: pagination.pageSize,
        SearchTerm: search,
      },
    })
  );

  if (isPurchaseError) return <ErrorContent />;

  return (
    <DataGroup>
      <DataItem
        label="Referencia de la factura"
        value={purchase.referenceInvoice}
      />

      <DataItem label="Fecha">
        <LocalDate date={purchase.operationDate} />
      </DataItem>

      <DataItem
        label="Precio base"
        value={purchase.status === 0 ? "Completada" : "Cancelada"}
      />

      <DataItem label="Proveedor">
        <Link href={`/dashboard/suppliers/${purchase.supplierId}`}>
          {purchase.supplier.name}
        </Link>
      </DataItem>

      <DataItem label="Usuario relacionado" value={purchase.user.fullName} />

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
