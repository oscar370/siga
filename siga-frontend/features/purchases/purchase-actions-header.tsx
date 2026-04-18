"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import {
  cancelPurchaseMutation,
  getPurchasesOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type PurchaseActionsHeaderProps = {
  id: string;
};

export function PurchaseActionsHeader({ id }: PurchaseActionsHeaderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    ...cancelPurchaseMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getPurchasesOptions({ query: initialQueryParams })
      );
      toast.success("Se ha cancelado la compra");
      router.replace("/dashboard/purchases");
    },
    onError: () => toast.error("Ocurrió un error al cancelar la compra"),
  });

  return (
    <div className="flex justify-end">
      <ButtonGroup>
        <DeleteDialog
          title="Cancelar compra"
          description={`¿Deseas continuar con la cancelación de la compra?`}
          isPending={isPending}
          onDelete={() => mutate({ path: { id } })}
        />
      </ButtonGroup>
    </div>
  );
}
