"use client";

import { DeleteDialog } from "@/components/ui/delete-dialog";
import { deleteUnityOfMeasure } from "@/services/unity-of-measure/delete-unity-of-measure";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteUnityOfMeasureProps = {
  id: string;
  classNames?: {
    trigger?: string;
  };
};

export function DeleteUnityOfMeasure({
  id,
  classNames,
}: DeleteUnityOfMeasureProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const response = await deleteUnityOfMeasure(id);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      toast.success("Se eliminó la unidad de medida");
      router.replace("/dashboard/units-of-measure");
    });
  }

  return (
    <DeleteDialog
      title="Eliminar unidad de medida"
      description="¿Quieres proceder con la eliminación?"
      onDelete={handleDelete}
      isPending={isPending}
      classNames={classNames}
    />
  );
}
