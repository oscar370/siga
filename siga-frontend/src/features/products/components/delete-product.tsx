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
import { deleteProduct } from "@/services/product/delete-product";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteProductProps = {
  id: string;
  classNames?: {
    trigger?: string;
  };
};

export function DeleteProduct({ id, classNames }: DeleteProductProps) {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      toast.success("Se eliminó el producto");
      router.replace("/dashboard/products");
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
          <DialogTitle>Eliminar producto</DialogTitle>
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
