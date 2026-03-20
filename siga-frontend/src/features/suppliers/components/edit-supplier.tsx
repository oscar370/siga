"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { updateSupplier } from "@/services/supplier/update-supplier";
import { SupplierBasic, supplierBasicSchema } from "@/types/supplier/basic";
import { SupplierExtended } from "@/types/supplier/extended";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditSupplierProps = {
  id: string;
  supplier: SupplierExtended;
};

export function EditSupplier({ id, supplier }: EditSupplierProps) {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(supplierBasicSchema),
    defaultValues: supplier,
  });

  function onSubmit(data: SupplierBasic) {
    startTransition(async () => {
      const response = await updateSupplier(id, data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("El proveedor se ha actualizado");
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
