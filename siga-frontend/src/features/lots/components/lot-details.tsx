import { DataField } from "@/components/ui/data-field";
import { FormattedDate } from "@/components/ui/formatted-date";
import { LotExtended } from "@/types/lot/extendend";
import Link from "next/link";

type LotDetailsProps = {
  lot: LotExtended;
};

export function LotDetails({ lot }: LotDetailsProps) {
  return (
    <div className="space-y-2">
      <DataField label="Código del lote" value={lot.lotCode} />
      <DataField
        label="Fecha de entrada"
        value={<FormattedDate value={lot.entryDate} />}
      />
      <DataField label="Costo unitario" value={lot.unitCost} />
      <DataField label="Cantidad disponible" value={lot.availableQuantity} />
      <DataField
        label="Producto relacionado"
        value={
          <Link href={`/dashboard/products/${lot.product.id}`}>
            {lot.product.name}
          </Link>
        }
      />
      <DataField
        label="Compara relacionada"
        value={
          <Link href={`/dashboard/purchases/${lot.purchase.id}`}>
            {lot.purchase.referenceInvoice}
          </Link>
        }
      />
    </div>
  );
}
