import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteSupplier } from "./delete-supplier";

type SupplierActionsHeaderProps = {
  id: string;
};

export function SupplierActionsHeader({ id }: SupplierActionsHeaderProps) {
  return (
    <ButtonGroup>
      <Button variant="secondary" asChild>
        <Link href={`/dashboard/suppliers/edit/${id}`} aria-label="Editar">
          <Pencil />
        </Link>
      </Button>

      <DeleteSupplier id={id} />
    </ButtonGroup>
  );
}
