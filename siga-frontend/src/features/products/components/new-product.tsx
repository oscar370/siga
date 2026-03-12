"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { SkeletonForm } from "@/components/ui/skeleton-form";
import { Spinner } from "@/components/ui/spinner";
import { getCategories } from "@/services/category/get-categories";
import { createProduct } from "@/services/product/create-product";
import { getUnitsOfMeasure } from "@/services/unity-of-measure/get-units-of-measure";
import { productCreateSchema } from "@/types/product/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewProduct() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("El producto se ha creado");
    },
    onError: (r) => toast.error(r.message),
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: unitsOfMeasure,
    isLoading: isUnitsOfMeasureLoading,
    isError: isUnitsOfMeasureError,
  } = useQuery({
    queryKey: ["units-of-measure"],
    queryFn: getUnitsOfMeasure,
  });

  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(productCreateSchema),
  });

  if (isCategoriesError || isUnitsOfMeasureError) return <ErrorContent />;

  if (isCategoriesLoading || isUnitsOfMeasureLoading) return <SkeletonForm />;

  if (!categories || !unitsOfMeasure) return null;

  return (
    <Form onSubmit={handleSubmit((data) => mutate(data))}>
      <Form.Input
        name="name"
        control={control}
        label="Nombre"
        rules={{ required: true }}
      />

      <Form.Input
        name="sku"
        control={control}
        label="SKU"
        rules={{ required: true }}
      />

      <Form.Input
        name="basePrice"
        control={control}
        label="Precio base"
        rules={{ required: true }}
        type="number"
      />

      <Form.Select
        name="categoryId"
        control={control}
        label="Categoría"
        rules={{ required: true }}
        placeholder="Selecciona una categoría..."
      >
        {categories.map((c) => (
          <SelectItem
            key={c.id}
            value={String(c.id)}
            className="text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {c.name} {c.description && `- ${c.description}`}
          </SelectItem>
        ))}
      </Form.Select>

      <Form.Select
        name="unityOfMeasureId"
        control={control}
        label="Unidad de medida"
        rules={{ required: true }}
        placeholder="Selecciona una unidad de medida..."
      >
        {unitsOfMeasure.map((um) => (
          <SelectItem key={um.id} value={String(um.id)}>
            {um.name} - {um.abbreviation}
          </SelectItem>
        ))}
      </Form.Select>

      <Form.Textarea name="description" control={control} label="Descripción" />

      <Button className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
