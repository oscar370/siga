"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { updateUnityOfMeasure } from "@/services/unity-of-measure/update-unity-of-measure";
import {
  UnityOfMeasureBasic,
  unityOfMeasureBasicSchema,
} from "@/types/unity-of-measure/unity-of-measure-basic";
import { UnityOfMeasureExtended } from "@/types/unity-of-measure/unity-of-measure-extended";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditUnityOfMeasureProps = {
  id: string;
  unityOfMeasure: UnityOfMeasureExtended;
};

export function EditUnityOfMeasure({
  id,
  unityOfMeasure,
}: EditUnityOfMeasureProps) {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(unityOfMeasureBasicSchema),
    defaultValues: unityOfMeasure,
  });

  function onSubmit(data: UnityOfMeasureBasic) {
    startTransition(async () => {
      const response = await updateUnityOfMeasure(id, data);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("La unidad de medida se ha actualizado");
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
