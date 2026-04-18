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
  createProductMutation,
  getCategoriesLookupOptions,
  getProductsOptions,
  getUnitsOfMeasureLookupOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { zProductCreateDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(zProductCreateDto),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      basePrice: "",
      categoryId: "",
      unityOfMeasureId: "",
    },
  });

  const { data: categories, isError: isCategoriesError } = useSuspenseQuery(
    getCategoriesLookupOptions()
  );

  const { data: unitsOfMeasure, isError: isUnitsOfMeasureError } =
    useSuspenseQuery(getUnitsOfMeasureLookupOptions());

  const { mutate, isPending } = useMutation({
    ...createProductMutation(),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: getProductsOptions({ query: initialQueryParams }).queryKey,
      });
      router.refresh();
      toast.success("Producto creado");
    },
    onError: () => toast.error("Ocurrió un error al crear el producto"),
  });

  return (
    <Form onSubmit={handleSubmit((data) => mutate({ body: data }))}>
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
