import { UserBasicDto } from "@/lib/client"
import { LogOut } from "lucide-react"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

type UserWidgetProps = {
  user: UserBasicDto
}

export function UserWidget({ user }: UserWidgetProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-1 text-sm">
        {user.fullName}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button className="justify-start" variant="ghost">
              <LogOut />
              Cerrar sesión
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
