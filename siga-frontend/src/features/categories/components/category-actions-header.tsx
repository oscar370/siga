import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteCategory } from "./delete-category";

type CategoryActionsHeaderProps = {
  id: string;
};

export function CategoryActionsHeader({ id }: CategoryActionsHeaderProps) {
  return (
    <ButtonGroup>
      <Button variant="secondary" asChild>
        <Link href={`/dashboard/categories/edit/${id}`} aria-label="Editar">
          <Pencil />
        </Link>
      </Button>

      <DeleteCategory id={id} />
    </ButtonGroup>
  );
}
