"use client";

import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { Form } from "@/components/ui/form";
import { SkeletonForm } from "@/components/ui/skeleton-form";
import { Spinner } from "@/components/ui/spinner";
import { getCategoryById } from "@/services/category/get-categoryById";
import { updateCategory } from "@/services/category/update-category";
import { CategoryBasic, categoryBasicSchema } from "@/types/category/basic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditCategoryProps = {
  id: string;
};

export function EditCategory({ id }: EditCategoryProps) {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(+id),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(categoryBasicSchema),
    defaultValues: data,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CategoryBasic) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "category", id],
      });
      toast.success("La categoría se ha actualizado");
      router.replace(`/dashboard/categories/${id}`);
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

  return (
    <Form onSubmit={handleSubmit((data) => mutate(data))}>
      <Form.Input name="name" control={control} label="Nombre" />

      <Form.Textarea name="description" control={control} label="Descripción" />

      <Button className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </Form>
  );
}
