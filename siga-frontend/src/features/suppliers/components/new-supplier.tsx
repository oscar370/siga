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
import { supplierCreateSchema } from "@/types/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createSupplier } from "../../../services/create-supplier";

export function NewSupplier() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supplierCreateSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("El proveedor se ha creado");
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
          <FieldLabel>
            RFC
            <span className="text-destructive">*</span>
          </FieldLabel>
          <Input {...register("taxId")} />
          <FieldError>{errors?.taxId?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Información de contacto</FieldLabel>
          <Input {...register("contactInfo")} />
          <FieldError>{errors?.contactInfo?.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button className="w-full mt-4" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </form>
  );
}
