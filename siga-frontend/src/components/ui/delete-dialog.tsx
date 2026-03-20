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
import { Spinner } from "@/components/ui/spinner";
import { Trash } from "lucide-react";

type DeleteDialogProps = {
  title: string;
  description: string;
  isPending: boolean;
  classNames?: {
    trigger?: string;
  };
  onDelete: () => void;
};

export function DeleteDialog({
  title,
  description,
  isPending,
  classNames,
  onDelete,
}: DeleteDialogProps) {
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
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>{description}</DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isPending} variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onDelete}>
            {isPending ? <Spinner /> : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
