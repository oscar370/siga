import { DataField } from "@/components/ui/data-field";
import { SupplierExtended } from "@/types/supplier/extended";
import { PurchasesInSuppliersTable } from "./purchases-in-suppliers-table";

type SupplierDetailsProps = {
  supplier: SupplierExtended;
};

export function SupplierDetails({ supplier }: SupplierDetailsProps) {
  return (
    <div className="space-y-2">
      <DataField label="Nombre" value={supplier.name} />
      <DataField label="RFC" value={supplier.taxId} />
      {supplier.contactInfo && (
        <DataField
          label="Información de contacto"
          value={supplier.contactInfo}
        />
      )}
      <DataField label="Compras relacionadas">
        <PurchasesInSuppliersTable purchases={supplier.purchases} />
      </DataField>
    </div>
  );
}
