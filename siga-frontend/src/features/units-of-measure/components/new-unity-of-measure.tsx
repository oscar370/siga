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
import { unityOfMeasureCreteSchema } from "@/types/unity-of-measure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUnityOfMeasure } from "../../../services/create-unity-of-measure";

export function NewUnityOfMeasure() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
            Abreviatura
            <span className="text-destructive">*</span>
          </FieldLabel>
          <Input {...register("abbreviation")} />
          <FieldError>{errors?.abbreviation?.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button className="w-full mt-4" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </form>
  );
}
