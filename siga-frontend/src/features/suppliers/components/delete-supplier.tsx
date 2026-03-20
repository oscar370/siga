"use client";

import { DeleteDialog } from "@/components/ui/delete-dialog";
import { deleteSupplier } from "@/services/supplier/delete-supplier";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteSupplierProps = {
  id: string;
  classNames?: {
    trigger?: string;
  };
};

export function DeleteSupplier({ id, classNames }: DeleteSupplierProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const response = await deleteSupplier(id);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("Se eliminó el proveedor");
      router.replace("/dashboard/suppliers");
    });
  }

  return (
    <DeleteDialog
      title="Eliminar proveedor"
      description="¿Quieres proceder con la eliminación?"
      isPending={isPending}
      classNames={classNames}
      onDelete={handleDelete}
    />
  );
}
