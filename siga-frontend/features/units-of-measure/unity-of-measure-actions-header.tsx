"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Link } from "@/components/ui/link";
import {
  deleteUnityOfMeasureMutation,
  getUnitsOfMeasureOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UnityOfMeasureActionsHeaderProps = {
  id: string;
};

export function UnityOfMeasureActionsHeader({
  id,
}: UnityOfMeasureActionsHeaderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    ...deleteUnityOfMeasureMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries(
        getUnitsOfMeasureOptions({ query: initialQueryParams })
      );
      toast.success("Se ha eliminado la unidad de medida");
      router.replace("/dashboard/categories");
    },
    onError: () =>
      toast.error("Ocurrió un error al eliminar la unidad de medida"),
  });

  return (
    <div className="flex justify-end">
      <ButtonGroup>
        <Link
          variant="secondary"
          href={`/dashboard/units-of-measure/${id}/edit`}
          aria-label="Editar unidad de medida"
        >
          <Pencil />
        </Link>

        <DeleteDialog
          title="Eliminar unidad de medida"
          description={`¿Deseas continuar con la eliminación de la unidad de medida?`}
          isPending={isPending}
          onDelete={() => mutate({ path: { id } })}
        />
      </ButtonGroup>
    </div>
  );
}
