"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { Form, FormInput } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import {
  getSupplierByIdOptions,
  getSuppliersOptions,
  updateSupplierMutation,
} from "@/lib/client/@tanstack/react-query.gen";
import { zSupplierBasicDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditSupplierProps = {
  id: string;
};

export function EditSupplier({ id }: EditSupplierProps) {
  const queryClient = useQueryClient();
  const { data, isError } = useSuspenseQuery(
    getSupplierByIdOptions({ path: { id } })
  );
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zSupplierBasicDto),
    defaultValues: data,
  });

  const { mutate, isPending } = useMutation({
    ...updateSupplierMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(getSupplierByIdOptions({ path: { id } }));
      queryClient.invalidateQueries(
        getSuppliersOptions({ query: initialQueryParams })
      );
      toast.success("Se ha actualizado el proveedor");
    },
    onError: () => toast.error("Ocurrió un error al actualizar el proveedor"),
  });

  if (isError) return <ErrorContent />;

  return (
    <Form
      onSubmit={handleSubmit((data) => mutate({ path: { id }, body: data }))}
    >
      <FormInput name="name" control={control} label="Nombre" isRequired />

      <FormInput name="taxId" control={control} label="RFC" isRequired />

      <FormInput
        name="contactInfo"
        control={control}
        label="Información de contacto"
      />

      <Button type="submit" className="mt-2 w-full" disabled={isPending}>
        {isPending ? <Spinner /> : "Actualizar"}
      </Button>
    </Form>
  );
}
