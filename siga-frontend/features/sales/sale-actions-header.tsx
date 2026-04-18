"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import {
  cancelSaleMutation,
  getSalesOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SaleActionsHeaderProps = {
  id: string;
};

export function SaleActionsHeader({ id }: SaleActionsHeaderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    ...cancelSaleMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getSalesOptions({ query: initialQueryParams })
      );
      toast.success("Se ha cancelado la venta");
      router.replace("/dashboard/sales");
    },
    onError: () => toast.error("Ocurrió un error al cancelar la venta"),
  });

  return (
    <div className="flex justify-end">
      <ButtonGroup>
        <DeleteDialog
          title="Cancelar venta"
          description={`¿Deseas continuar con la cancelación de la venta?`}
          isPending={isPending}
          onDelete={() => mutate({ path: { id } })}
        />
      </ButtonGroup>
    </div>
  );
}
