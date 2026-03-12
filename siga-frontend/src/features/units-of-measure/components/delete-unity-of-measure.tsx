"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUnityOfMeasure } from "@/services/unity-of-measure/delete-unity-of-measure";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => deleteUnityOfMeasure(id),
    onSuccess: () => {
      toast.success("Se eliminó la unidad de medida");
      router.replace("/dashboard/units-of-measure");
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${classNames?.trigger ?? ""}`}
          variant="destructive"
          aria-label="Eliminar"
        >
          <Trash />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar unidad de medida</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          ¿Quieres proceder con la eliminación?
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button onClick={() => mutate()}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
