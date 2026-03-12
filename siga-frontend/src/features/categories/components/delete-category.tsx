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
import { deleteCategory } from "@/services/category/delete-category";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteCategoryProps = {
  id: string;
  classNames?: {
    trigger?: string;
  };
};

export function DeleteCategory({ id, classNames }: DeleteCategoryProps) {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => deleteCategory(id),
    onSuccess: () => {
      toast.success("Se eliminó la categoría");
      router.replace("/dashboard/categories");
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
          <DialogTitle>Eliminar categoría</DialogTitle>
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
