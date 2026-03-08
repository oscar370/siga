import { BackButton } from "./back-button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./navigation-menu";

type HeaderAppProps = {
  title: string;
};

export function Header({ title }: HeaderAppProps) {
  return (
    <header>
      <NavigationMenu className="max-w-full h-(--header-height)">
        <NavigationMenuList className="w-full grid grid-cols-3">
          <BackButton />

          <NavigationMenuItem className="col-start-2">
            <h1 className="font-bold">{title}</h1>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
