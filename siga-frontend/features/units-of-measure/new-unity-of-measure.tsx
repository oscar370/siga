"use client";

import { Button } from "@/components/ui/button";
import { Form, FormInput } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import {
  createUnityOfMeasureMutation,
  getUnitsOfMeasureOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { zUnityOfMeasureCreateDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewUnityOfMeasure() {
  const queryClient = useQueryClient();
  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(zUnityOfMeasureCreateDto),
    defaultValues: {
      name: "",
      abbreviation: "",
    },
  });

  const { mutate, isPending } = useMutation({
    ...createUnityOfMeasureMutation(),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(
        getUnitsOfMeasureOptions({ query: initialQueryParams })
      );
      toast.success("Unidad de medida creada");
    },
    onError: () => toast.error("Ocurrió un error al crear la unidad de medida"),
  });

  return (
    <Form onSubmit={handleSubmit((data) => mutate({ body: data }))}>
      <FormInput name="name" control={control} label="Nombre" isRequired />

      <FormInput
        name="abbreviation"
        control={control}
        label="Abreviatura"
        isRequired
      />

      <Button type="submit" className="mt-2 w-full" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
