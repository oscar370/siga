"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { createCategory } from "@/services/category/create-category";
import { CategoryCreate, categoryCreateSchema } from "@/types/category/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewCategory() {
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(categoryCreateSchema),
  });

  async function onSubmit(data: CategoryCreate) {
    startTransition(async () => {
      const response = await createCategory(data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("La categoría se ha creado");
      reset();
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
