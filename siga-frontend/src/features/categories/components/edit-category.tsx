"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { updateCategory } from "@/services/category/update-category";
import { CategoryBasic, categoryBasicSchema } from "@/types/category/basic";
import { CategoryExtended } from "@/types/category/extended";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditCategoryProps = {
  id: string;
  category: CategoryExtended;
};

export function EditCategory({ id, category }: EditCategoryProps) {
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(categoryBasicSchema),
    defaultValues: category,
  });

  function onSubmit(data: CategoryBasic) {
    startTransition(async () => {
      const response = await updateCategory(id, data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("La categoría se ha actualizado");
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input name="name" control={control} label="Nombre" />

      <Form.Textarea name="description" control={control} label="Descripción" />

      <Button className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
