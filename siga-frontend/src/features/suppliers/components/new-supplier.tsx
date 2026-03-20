"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { createSupplier } from "@/services/supplier/create-supplier";
import { SupplierCreate, supplierCreateSchema } from "@/types/supplier/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewSupplier() {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(supplierCreateSchema),
    defaultValues: {
      name: "",
      taxId: "",
      contactInfo: "",
    },
  });

  function onSubmit(data: SupplierCreate) {
    startTransition(async () => {
      const response = await createSupplier(data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("El proveedor se ha creado");
      reset();
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
        name="taxId"
        control={control}
        label="RFC"
        rules={{ required: true }}
      />

      <Form.Input
        name="contactInfo"
        control={control}
        label="Información de contacto"
      />

      <Button className="w-full mt-4" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
