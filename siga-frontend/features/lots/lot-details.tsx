"use client";

import { DataGroup, DataItem } from "@/components/ui/data-field";
import { ErrorContent } from "@/components/ui/error-content";
import { Link } from "@/components/ui/link";
import { LocalDate } from "@/components/ui/local-date";
import { getLotByIdOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";

type LotDetailsProps = {
  id: string;
};

export function LotDetails({ id }: LotDetailsProps) {
  const { data, isError } = useSuspenseQuery(
    getLotByIdOptions({ path: { id } })
  );

  if (isError) return <ErrorContent />;

  return (
    <DataGroup>
      <DataItem label="Código del lote" value={data.lotCode} />

      <DataItem label="Producto asociado">
        <Link href={`/dashboard/products/${data.productId}`}>
          {data.product.name}
        </Link>
      </DataItem>

      <DataItem label="Fecha">
        <LocalDate date={data.entryDate} />
      </DataItem>

      <DataItem label="Costo unitario" value={`$ ${data.unitCost}`} />

      <DataItem label="Cantidad disponible" value={data.availableQuantity} />

      <DataItem label="Compra asociada">
        <Link href={`/dashboard/purchases/${data.purchaseId}`}>
          {data.purchase.referenceInvoice}
        </Link>
      </DataItem>
    </DataGroup>
  );
}
