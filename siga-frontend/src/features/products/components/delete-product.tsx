"use client";

import { DeleteDialog } from "@/components/ui/delete-dialog";
import { deleteProduct } from "@/services/product/delete-product";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteProductProps = {
  id: string;
  classNames?: {
    trigger?: string;
  };
};

export function DeleteProduct({ id, classNames }: DeleteProductProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const response = await deleteProduct(id);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("Se eliminó el producto");
      router.replace("/dashboard/products");
    });
  }

  return (
    <DeleteDialog
      title="Eliminar producto"
      description="¿Quieres proceder con la eliminación?"
      isPending={isPending}
      classNames={classNames}
      onDelete={handleDelete}
    />
  );
}
