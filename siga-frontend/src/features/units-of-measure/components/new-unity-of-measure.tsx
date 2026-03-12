"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { createUnityOfMeasure } from "@/services/unity-of-measure/create-unity-of-measure";
import { unityOfMeasureCreteSchema } from "@/types/unity-of-measure/unity-of-measure-create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewUnityOfMeasure() {
  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(unityOfMeasureCreteSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createUnityOfMeasure,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["units-of-measure"] });
      toast.success("La unidad de medida se ha creado");
    },
    onError: (r) => toast.error(r.message),
  });

  return (
    <Form onSubmit={handleSubmit((data) => mutate(data))}>
      <Form.Input name="name" control={control} label="Nombre" />

      <Form.Input name="abbreviation" control={control} label="Abreviatura" />

      <Button className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
