"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { createUnityOfMeasure } from "@/services/unity-of-measure/create-unity-of-measure";
import {
  UnityOfMeasureCreate,
  unityOfMeasureCreteSchema,
} from "@/types/unity-of-measure/unity-of-measure-create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function NewUnityOfMeasure() {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(unityOfMeasureCreteSchema),
    defaultValues: {
      name: "",
      abbreviation: "",
    },
  });

  function onSubmit(data: UnityOfMeasureCreate) {
    startTransition(async () => {
      const response = await createUnityOfMeasure(data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("Se ha creado la unidad de medida");
      reset();
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input name="name" control={control} label="Nombre" />

      <Form.Input name="abbreviation" control={control} label="Abreviatura" />

      <Button className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
