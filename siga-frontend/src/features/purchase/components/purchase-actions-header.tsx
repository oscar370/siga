import { ButtonGroup } from "@/components/ui/button-group";
import { CancelPurchase } from "./cancel-purchase";

type PurchaseActionsHeaderProps = {
  id: string;
};

export function PurchaseActionsHeader({ id }: PurchaseActionsHeaderProps) {
  return (
    <ButtonGroup>
      <CancelPurchase id={id} />
    </ButtonGroup>
  );
}
