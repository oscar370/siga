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
  createSaleMutation,
  getProductsLookupOptions,
  getSalesOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { zSaleCreateDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewSale() {
  const canMutate = useCanMutate();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(zSaleCreateDto),
    defaultValues: {
      operationDate: new Date().toISOString(),
      items: [{ productId: "", quantity: 0, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "items",
  });

  const { data: products, isError: isProductsError } = useSuspenseQuery(
    getProductsLookupOptions()
  );

  const { mutate, isPending } = useMutation({
    ...createSaleMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getSalesOptions({ query: initialQueryParams })
      );
      reset();
      toast.success("Se ha creado la venta");
    },
    onError: () => toast.error("Ocurrió un problema al crear la venta"),
  });

  return (
    <Form onSubmit={handleSubmit((data) => mutate({ body: data }))}>
      <FormDateTimeInput
        name="operationDate"
        control={control}
        label="Fecha de la operación"
        isRequired
      />

      <Separator />

      <FormFieldSet
        title="Productos asociados"
        description="Agrega los productos asociados a la compra. Mínimo un producto"
      >
        {fields.map((f, i) => (
          <div key={f.id} className="space-y-2">
            <FormSelect
              name={`items.${i}.productId`}
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
                name={`items.${i}.quantity`}
                control={control}
                label="Cantidad"
                type="number"
                isRequired
              />

              <FormInput
                name={`items.${i}.unitPrice`}
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
        onClick={() => append({ productId: "", quantity: 0, unitPrice: 0 })}
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
