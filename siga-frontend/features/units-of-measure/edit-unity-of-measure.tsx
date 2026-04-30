"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { Form, FormInput, FormTextArea } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCanMutate } from "@/hooks/use-can-mutate";
import {
  getUnitsOfMeasureOptions,
  getUnityOfMeasureByIdOptions,
  updateUnityOfMeasureMutation,
} from "@/lib/client/@tanstack/react-query.gen";
import { zUnityOfMeasureBasicDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditUnityOfMeasureProps = {
  id: string;
};

export function EditUnityOfMeasure({ id }: EditUnityOfMeasureProps) {
  const canMutate = useCanMutate();
  const queryClient = useQueryClient();
  const { data, isError } = useSuspenseQuery(
    getUnityOfMeasureByIdOptions({ path: { id } })
  );
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zUnityOfMeasureBasicDto),
    defaultValues: data,
  });

  const { mutate, isPending } = useMutation({
    ...updateUnityOfMeasureMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getUnityOfMeasureByIdOptions({ path: { id } })
      );
      queryClient.invalidateQueries(
        getUnitsOfMeasureOptions({ query: initialQueryParams })
      );
      toast.success("Se ha actualizado la unidad de medida");
    },
    onError: () =>
      toast.error("Ocurrió un error al actualizar la unidad de medida"),
  });

  if (isError) return <ErrorContent />;

  return (
    <Form
      onSubmit={handleSubmit((data) => mutate({ path: { id }, body: data }))}
    >
      <FormInput name="name" control={control} label="Nombre" isRequired />

      <FormTextArea
        name="abbreviation"
        control={control}
        label="Abreviatura"
        isRequired
      />

      {canMutate && (
        <Button type="submit" className="mt-2 w-full" disabled={isPending}>
          {isPending ? <Spinner /> : "Actualizar"}
        </Button>
      )}
    </Form>
  );
}
