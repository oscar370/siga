"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Link } from "@/components/ui/link";
import {
  deleteProductMutation,
  getProductsOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProductActionsHeaderProps = {
  id: string;
};

export function ProductActionsHeader({ id }: ProductActionsHeaderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    ...deleteProductMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getProductsOptions({ query: initialQueryParams })
      );
      toast.success("Se ha eliminado el producto");
      router.replace("/dashboard/categories");
    },
    onError: () => toast.error("Ocurrió un error al eliminar el producto"),
  });

  return (
    <div className="flex justify-end">
      <ButtonGroup>
        <Link
          variant="outline"
          href={`/dashboard/products/${id}/edit`}
          aria-label="Editar producto"
        >
          <Pencil />
        </Link>

        <DeleteDialog
          title="Eliminar producto"
          description={`¿Deseas continuar con la eliminación del producto?`}
          isPending={isPending}
          onDelete={() => mutate({ path: { id } })}
        />
      </ButtonGroup>
    </div>
  );
}
