"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { toDatetimeLocal } from "@/lib/utils";
import { createPurchase } from "@/services/purchase/create-purchase";
import { ProductExtended } from "@/types/product/extended";
import { PurchaseCreate, purchaseCreateSchema } from "@/types/purchase/create";
import { SupplierBasic } from "@/types/supplier/basic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

type NewPurchaseProps = {
  suppliers: SupplierBasic[];
  products: ProductExtended[];
};

export function NewPurchase({ suppliers, products }: NewPurchaseProps) {
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(purchaseCreateSchema),
    defaultValues: {
      referenceInvoice: "",
      operationDate: toDatetimeLocal(new Date().toISOString()),
      purchaseItems: [{ productId: "", quantity: 0, unitCost: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "purchaseItems",
  });

  function onSubmit(data: PurchaseCreate) {
    startTransition(async () => {
      const response = await createPurchase(data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("La compra se ha creado");
      reset();
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        name="referenceInvoice"
        control={control}
        label="Referencia de la factura"
      />

      <Form.Input
        name="operationDate"
        control={control}
        label="Fecha de la operación"
        type="datetime-local"
      />

      <Form.Select
        name="supplierId"
        control={control}
        label="Proveedor"
        placeholder="Selecciona un proveedor..."
      >
        {suppliers.map((s) => (
          <SelectItem key={s.id} value={String(s.id)}>
            {s.name}
          </SelectItem>
        ))}
      </Form.Select>

      <Separator />

      <Form.FieldSet
        title="Productos asociados"
        description="Agrega los productos asociados a la compra"
      >
        {fields.map((f, i) => (
          <div key={f.id} className="space-y-2">
            <Form.Select
              name={`purchaseItems.${i}.productId`}
              control={control}
              label="Producto"
              placeholder="Selecciona un producto..."
            >
              {products.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name} - {p.unityOfMeasure.abbreviation}
                </SelectItem>
              ))}
            </Form.Select>

            <div className="grid grid-cols-2 gap-2">
              <Form.Input
                name={`purchaseItems.${i}.quantity`}
                control={control}
                label="Cantidad"
                type="number"
              />

              <Form.Input
                name={`purchaseItems.${i}.unitCost`}
                control={control}
                label="Costo unitario"
                type="number"
              />
            </div>

            {fields.length > 1 && (
              <Button
                className="w-full"
                variant="destructive"
                onClick={() => remove(i)}
              >
                Eliminar producto
              </Button>
            )}
          </div>
        ))}
      </Form.FieldSet>
      <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() => append({ productId: "", quantity: 0, unitCost: 0 })}
      >
        Agregar producto
      </Button>

      <Separator />

      <Button className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
