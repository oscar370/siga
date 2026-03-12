"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { createCategory } from "@/services/category/create-category";
import { categoryCreateSchema } from "@/types/category/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewCategory() {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(categoryCreateSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("La categoría se ha creado");
    },
    onError: (r) => toast.error(r.message),
  });

  return (
    <Form onSubmit={handleSubmit((data) => mutate(data))}>
      <Form.Input name="name" control={control} label="Nombre" />
      <Form.Textarea name="description" control={control} label="Descripción" />

      <Button className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
