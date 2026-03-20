"use client";

import { DeleteDialog } from "@/components/ui/delete-dialog";
import { cancelPurchase } from "@/services/purchase/cancel-purchase";
import { useTransition } from "react";
import { toast } from "sonner";

type CancelPurchaseProps = {
  id: string;
  classNames?: {
    trigger?: string;
  };
};

export function CancelPurchase({ id, classNames }: CancelPurchaseProps) {
  const [isPending, startTransition] = useTransition();

  function handleCancel() {
    startTransition(async () => {
      const response = await cancelPurchase(id);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("Se ha cancelado la compra");
    });
  }

  return (
    <DeleteDialog
      title="Cancelar compra"
      description="¿Deseas continuar con la cancelación?"
      isPending={isPending}
      classNames={classNames}
      onDelete={handleCancel}
    />
  );
}
