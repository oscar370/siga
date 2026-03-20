"use client";

import { DeleteDialog } from "@/components/ui/delete-dialog";
import { deleteCategory } from "@/services/category/delete-category";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteCategoryProps = {
  id: string;
  classNames?: {
    trigger?: string;
  };
};

export function DeleteCategory({ id, classNames }: DeleteCategoryProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const response = await deleteCategory(id);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("Se eliminó la categoría");
      router.replace("/dashboard/categories");
    });
  }

  return (
    <DeleteDialog
      title="Eliminar categoría"
      description="¿Quieres proceder con la eliminación?"
      isPending={isPending}
      onDelete={handleDelete}
      classNames={classNames}
    />
  );
}
