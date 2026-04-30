"use client";

import { DataTable } from "@/components/ui/data-table";
import { ErrorContent } from "@/components/ui/error-content";
import { Link } from "@/components/ui/link";
import { LocalDate } from "@/components/ui/local-date";
import { RecentTransactionDto } from "@/lib/client";
import { getRecentTransactionsOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<RecentTransactionDto>[] = [
  {
    accessorKey: "reference",
    header: "Referencia",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/${row.original.type === 0 ? "purchases" : "sales"}/${row.original.transactionId}`}
      >
        {row.original.reference}
      </Link>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipo de transacción",
    cell: ({ row }) => (row.original.type === 0 ? "Compra" : "Venta"),
  },
  {
    accessorKey: "operationDate",
    header: "Fecha",
    cell: ({ row }) => <LocalDate date={row.original.operationDate} />,
  },
  {
    accessorKey: "totalAmount",
    header: "Cantidad",
    cell: ({ row }) => `$ ${row.original.totalAmount}`,
  },
];

export function RecentTransactions() {
  const { data, isError, isLoading, isFetching } = useSuspenseQuery(
    getRecentTransactionsOptions()
  );

  if (!data || isError) return <ErrorContent />;

  return (
    <section className="space-y-2">
      <h2>Transacciones recientes</h2>

      <DataTable
        columns={columns}
        data={data}
        totalPages={data.length}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        disableColumnsToggle
        disablePageSize
        disablePagination
      />
    </section>
  );
}
