"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { Form, FormInput, FormTextArea } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCanMutate } from "@/hooks/use-can-mutate";
import {
  getCategoriesOptions,
  getCategoryByIdOptions,
  updateCategoryMutation,
} from "@/lib/client/@tanstack/react-query.gen";
import { zCategoryBasicDto } from "@/lib/client/zod.gen";
import { initialQueryParams } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditCategoryProps = {
  id: string;
};

export function EditCategory({ id }: EditCategoryProps) {
  const canMutate = useCanMutate();
  const queryClient = useQueryClient();
  const { data, isError } = useSuspenseQuery(
    getCategoryByIdOptions({ path: { id } })
  );
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zCategoryBasicDto),
    defaultValues: data,
  });

  const { mutate, isPending } = useMutation({
    ...updateCategoryMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(getCategoryByIdOptions({ path: { id } }));
      queryClient.invalidateQueries(
        getCategoriesOptions({ query: initialQueryParams })
      );
      toast.success("Se ha actualizado la categoría");
    },
    onError: () => toast.error("Ocurrió un error al actualizar la categoría"),
  });

  if (isError) return <ErrorContent />;

  return (
    <Form
      onSubmit={handleSubmit((data) => mutate({ path: { id }, body: data }))}
    >
      <FormInput name="name" control={control} label="Nombre" isRequired />

      <FormTextArea name="description" control={control} label="Descripción" />

      {canMutate && (
        <Button type="submit" className="mt-2 w-full" disabled={isPending}>
          {isPending ? <Spinner /> : "Actualizar"}
        </Button>
      )}
    </Form>
  );
}
