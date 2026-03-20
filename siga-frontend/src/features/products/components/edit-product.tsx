"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { updateProduct } from "@/services/product/update-product";
import { CategoryBasic } from "@/types/category/basic";
import { ProductBasic, productBasicSchema } from "@/types/product/basic";
import { ProductExtended } from "@/types/product/extended";
import { UnitsOfMeasureBasic } from "@/types/unity-of-measure/unity-of-measure-basic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditProductProps = {
  id: string;
  product: ProductExtended;
  categories: CategoryBasic[];
  unitsOfMeasure: UnitsOfMeasureBasic;
};

export function EditProduct({
  id,
  product,
  categories,
  unitsOfMeasure,
}: EditProductProps) {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(productBasicSchema),
    defaultValues: {
      ...product,
      categoryId: String(product.categoryId),
      unityOfMeasureId: String(product.unityOfMeasureId),
    },
  });

  function onSubmit(data: ProductBasic) {
    startTransition(async () => {
      const response = await updateProduct(id, data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("El producto se ha actualizado");
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
