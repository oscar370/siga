import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteProduct } from "./delete-product";

type ProductActionsHeaderProps = {
  id: string;
};

export function ProductActionsHeader({ id }: ProductActionsHeaderProps) {
  return (
    <ButtonGroup>
      <Button variant="secondary" asChild>
        <Link href={`/dashboard/products/edit/${id}`} aria-label="Editar">
          <Pencil />
        </Link>
      </Button>

      <DeleteProduct id={id} />
    </ButtonGroup>
  );
}
