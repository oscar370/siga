"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import {
  Form,
  FormInput,
  FormSelect,
  FormTextArea,
} from "@/components/ui/form";
import { SelectGroup, SelectItem } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  getCategoriesLookupOptions,
  getProductByIdOptions,
  getProductsOptions,
  getUnitsOfMeasureLookupOptions,
  updateProductMutation,
} from "@/lib/client/@tanstack/react-query.gen";
import { zProductExtendedDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditProductProps = {
  id: string;
};

export function EditProduct({ id }: EditProductProps) {
  const queryClient = useQueryClient();
  const { data, isError } = useSuspenseQuery(
    getProductByIdOptions({ path: { id } })
  );

  const { data: categories, isError: isCategoriesError } = useSuspenseQuery(
    getCategoriesLookupOptions()
  );

  const { data: unitsOfMeasure, isError: isUnitsOfMeasureError } =
    useSuspenseQuery(getUnitsOfMeasureLookupOptions());

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zProductExtendedDto),
    defaultValues: {
      ...data,
      categoryId: data?.categoryId ? String(data.categoryId) : undefined,
      unityOfMeasureId: data?.unityOfMeasureId
        ? String(data.unityOfMeasureId)
        : undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    ...updateProductMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(getProductByIdOptions({ path: { id } }));
      queryClient.invalidateQueries(
        getProductsOptions({ query: initialQueryParams })
      );
      toast.success("Producto actualizado");
    },
    onError: () => toast.error("Ocurrió un error al actualizar el producto"),
  });

  if (isError) return <ErrorContent />;

  return (
    <Form
      onSubmit={handleSubmit((data) => mutate({ path: { id }, body: data }))}
    >
      <FormInput name="name" control={control} label="Nombre" isRequired />

      <FormInput name="sku" control={control} label="SKU" isRequired />

      <FormInput
        name="basePrice"
        control={control}
        label="Precio base"
        isRequired
        type="number"
      />

      <FormSelect
        name="categoryId"
        control={control}
        label="Categoría"
        isRequired
        placeholder="Selecciona una categoría..."
      >
        {isCategoriesError ? (
          <ErrorContent />
        ) : (
          <SelectGroup>
            {categories.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </FormSelect>

      <FormSelect
        name="unityOfMeasureId"
        control={control}
        label="Unidad de medida"
        isRequired
        placeholder="Selecciona una unidad de medida..."
      >
        {isUnitsOfMeasureError ? (
          <ErrorContent />
        ) : (
          <SelectGroup>
            {unitsOfMeasure.map((um) => (
              <SelectItem key={um.id} value={String(um.id)}>
                {um.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </FormSelect>

      <FormTextArea name="description" control={control} label="Descripción" />

      <Button type="submit" className="mt-2 w-full" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
