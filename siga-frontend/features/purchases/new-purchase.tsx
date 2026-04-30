"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import {
  Form,
  FormDateTimeInput,
  FormFieldSet,
  FormInput,
  FormSelect,
} from "@/components/ui/form";
import { SelectGroup, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useCanMutate } from "@/hooks/use-can-mutate";
import {
  createPurchaseMutation,
  getProductsLookupOptions,
  getPurchasesOptions,
  getSuppliersLookupOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { zPurchaseCreateDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewPurchase() {
  const canMutate = useCanMutate();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(zPurchaseCreateDto),
    defaultValues: {
      referenceInvoice: "",
      operationDate: new Date().toISOString(),
      supplierId: "",
      purchaseItems: [{ productId: "", quantity: 0, unitCost: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "purchaseItems",
  });

  const { data: suppliers, isError: isSuppliersError } = useSuspenseQuery(
    getSuppliersLookupOptions()
  );

  const { data: products, isError: isProductsError } = useSuspenseQuery(
    getProductsLookupOptions()
  );

  const { mutate, isPending } = useMutation({
    ...createPurchaseMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getPurchasesOptions({ query: initialQueryParams })
      );
      reset();
      toast.success("Se ha creado la compra");
    },
    onError: () => toast.error("Ocurrió un problema al crear la compra"),
  });

  return (
    <Form onSubmit={handleSubmit((data) => mutate({ body: data }))}>
      <FormInput
        name="referenceInvoice"
        control={control}
        label="Referencia de la factura"
        isRequired
      />

      <FormDateTimeInput
        name="operationDate"
        control={control}
        label="Fecha de la operación"
        isRequired
      />

      <FormSelect
        name="supplierId"
        control={control}
        label="Proveedor"
        placeholder="Selecciona un proveedor..."
        isRequired
      >
        {isSuppliersError ? (
          <ErrorContent />
        ) : (
          <SelectGroup>
            {suppliers.map((s) => (
              <SelectItem key={s.id} value={String(s.id)}>
                {s.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </FormSelect>

      <Separator />

      <FormFieldSet
        title="Productos asociados"
        description="Agrega los productos asociados a la compra. Mínimo un producto"
      >
        {fields.map((f, i) => (
          <div key={f.id} className="space-y-2">
            <FormSelect
              name={`purchaseItems.${i}.productId`}
              control={control}
              label="Producto"
              placeholder="Selecciona un producto..."
              isRequired
            >
              {isProductsError ? (
                <ErrorContent />
              ) : (
                <SelectGroup>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </FormSelect>

            <div className="grid grid-cols-2 gap-2">
              <FormInput
                name={`purchaseItems.${i}.quantity`}
                control={control}
                label="Cantidad"
                type="number"
                isRequired
              />

              <FormInput
                name={`purchaseItems.${i}.unitCost`}
                control={control}
                label="Costo unitario"
                type="number"
                isRequired
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
      </FormFieldSet>

      <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() => append({ productId: "", quantity: 0, unitCost: 0 })}
      >
        Agregar producto
      </Button>

      <Separator />

      {canMutate && (
        <Button type="submit" className="mt-2 w-full" disabled={isPending}>
          {isPending ? <Spinner /> : "Guardar"}
        </Button>
      )}
    </Form>
  );
}
