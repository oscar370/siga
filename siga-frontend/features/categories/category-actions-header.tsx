"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Link } from "@/components/ui/link";
import {
  deleteCategoryMutation,
  getCategoriesOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CategoryActionsHeaderProps = {
  id: string;
};

export function CategoryActionsHeader({ id }: CategoryActionsHeaderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    ...deleteCategoryMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getCategoriesOptions({ query: initialQueryParams })
      );
      toast.success("Se ha eliminado la categoría");
      router.replace("/dashboard/categories");
    },
    onError: () => toast.error("Ocurrió un error al eliminar la categoría"),
  });

  return (
    <div className="flex justify-end">
      <ButtonGroup>
        <Link
          variant="secondary"
          href={`/dashboard/categories/${id}/edit`}
          aria-label="Editar categoría"
        >
          <Pencil />
        </Link>

        <DeleteDialog
          title="Eliminar categoría"
          description={`¿Deseas continuar con la eliminación de la categoría?`}
          isPending={isPending}
          onDelete={() => mutate({ path: { id } })}
        />
      </ButtonGroup>
    </div>
  );
}
