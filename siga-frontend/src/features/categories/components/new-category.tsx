"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { categoryCreateSchema } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCategory } from "../../../services/create-category";

export function NewCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categoryCreateSchema),
  });

  const queryClient = useQueryClient();

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
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <FieldGroup>
        <Field>
          <FieldLabel>
            Nombre
            <span className="text-destructive">*</span>
          </FieldLabel>
          <Input {...register("name")} />
          <FieldError>{errors?.name?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Descripción</FieldLabel>
          <Textarea {...register("description")} />
          <FieldError>{errors?.description?.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button className="w-full mt-4" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </form>
  );
}
