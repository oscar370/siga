import { UserBasicDto } from "@/lib/client";
import { LogOut } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

type UserWidgetProps = {
  user: UserBasicDto;
  onLogout: () => void;
};

export function UserWidget({ user, onLogout }: UserWidgetProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-1 text-sm">
        {user.fullName}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <form action={onLogout}>
              <Button className="justify-start" variant="ghost">
                <LogOut />
                Cerrar sesión
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
