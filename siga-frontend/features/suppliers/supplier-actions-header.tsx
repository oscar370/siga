"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Link } from "@/components/ui/link";
import {
  deleteSupplierMutation,
  getSuppliersOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SupplierActionsHeaderProps = {
  id: string;
};

export function SupplierActionsHeader({ id }: SupplierActionsHeaderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    ...deleteSupplierMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getSuppliersOptions({ query: initialQueryParams })
      );
      toast.success("Se ha eliminado el proveedor");
      router.replace("/dashboard/suppliers");
    },
    onError: () => toast.error("Ocurrió un error al eliminar el proveedor"),
  });

  return (
    <div className="flex justify-end">
      <ButtonGroup>
        <Link
          variant="secondary"
          href={`/dashboard/suppliers/${id}/edit`}
          aria-label="Editar proveedor"
        >
          <Pencil />
        </Link>

        <DeleteDialog
          title="Eliminar proveedor"
          description={`¿Deseas continuar con la eliminación del proveedor?`}
          isPending={isPending}
          onDelete={() => mutate({ path: { id } })}
        />
      </ButtonGroup>
    </div>
  );
}
