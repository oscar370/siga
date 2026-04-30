"use client";

import { Button } from "@/components/ui/button";
import { Form, FormInput } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCanMutate } from "@/hooks/use-can-mutate";
import {
  createSupplierMutation,
  getSuppliersOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { zSupplierCreateDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewSupplier() {
  const canMutate = useCanMutate();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(zSupplierCreateDto),
    defaultValues: {
      name: "",
      taxId: "",
      contactInfo: "",
    },
  });

  const { mutate, isPending } = useMutation({
    ...createSupplierMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getSuppliersOptions({ query: initialQueryParams })
      );
      reset();
      toast.success("Proveedor creado");
    },
    onError: () => toast.error("Ocurrió un error al crear al proveedor"),
  });

  return (
    <Form onSubmit={handleSubmit((data) => mutate({ body: data }))}>
      <FormInput name="name" control={control} label="Nombre" isRequired />

      <FormInput name="taxId" control={control} label="RFC" isRequired />

      <FormInput
        name="contactInfo"
        control={control}
        label="Información de contacto"
      />

      {canMutate && (
        <Button type="submit" className="mt-2 w-full" disabled={isPending}>
          {isPending ? <Spinner /> : "Guardar"}
        </Button>
      )}
    </Form>
  );
}
