"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { Form } from "@/components/ui/form";
import { SkeletonForm } from "@/components/ui/skeleton-form";
import { Spinner } from "@/components/ui/spinner";
import { getUnityOfMeasureById } from "@/services/unity-of-measure/get-unity-of-measure-by-id";
import { updateUnityOfMeasure } from "@/services/unity-of-measure/update-unity-of-measure";
import {
  UnityOfMeasureBasic,
  unityOfMeasureBasicSchema,
} from "@/types/unity-of-measure/unity-of-measure-basic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditUnityOfMeasureProps = {
  id: string;
};

export function EditUnityOfMeasure({ id }: EditUnityOfMeasureProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["units-of-measure", "unity-of-measure", id],
    queryFn: () => getUnityOfMeasureById(id),
  });

  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(unityOfMeasureBasicSchema),
    defaultValues: {
      id: 0,
      name: "",
      abbreviation: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UnityOfMeasureBasic) => updateUnityOfMeasure(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units-of-measure"] });
      toast.success("La unidad de medida se ha actualizado");
    },
    onError: (r) => toast.error(r.message),
  });

  useEffect(() => {
    if (!data) return;

    reset({
      ...data,
    });
  }, [data, reset]);

  if (isError) return <ErrorContent />;

  if (isLoading) return <SkeletonForm />;

  if (!data) return null;

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
