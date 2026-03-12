import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteUnityOfMeasure } from "./delete-unity-of-measure";

type UnityOfMeasureActionsHeaderProps = {
  id: string;
};

export function UnityOfMeasureActionsHeader({
  id,
}: UnityOfMeasureActionsHeaderProps) {
  return (
    <ButtonGroup>
      <Button variant="secondary" asChild>
        <Link href={`/dashboard/products/edit/${id}`} aria-label="Editar">
          <Pencil />
        </Link>
      </Button>

      <DeleteUnityOfMeasure id={id} />
    </ButtonGroup>
  );
}
