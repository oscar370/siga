import { DataField } from "@/components/ui/data-field";
import { FormattedDate } from "@/components/ui/formatted-date";
import { PurchaseExtended } from "@/types/purchase/extended";
import Link from "next/link";
import { LotsInPurchasesTable } from "./lots-in-purchases-table";

type PurchaseDetailsProps = {
  purchase: PurchaseExtended;
};

export function PurchaseDetails({ purchase }: PurchaseDetailsProps) {
  return (
    <div className="space-y-2">
      <DataField
        label="Referencia de la factura"
        value={purchase.referenceInvoice}
      />
      <DataField
        label="Fecha"
        value={<FormattedDate value={purchase.operationDate} />}
      />
      <DataField
        label="Precio base"
        value={purchase.status === 0 ? "Completada" : "Cancelada"}
      />

      <DataField
        label="Proveedor"
        value={
          <Link href={`/dashboard/suppliers/${purchase.supplierId}`}>
            {purchase.supplier.name}
          </Link>
        }
      />

      <DataField label="Usuario relacionado" value={purchase.user.fullName} />

      <DataField label="Lotes relacionados">
        <LotsInPurchasesTable lots={purchase.lots} />
      </DataField>
    </div>
  );
}
