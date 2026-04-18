"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Box,
  Boxes,
  HandCoins,
  Home,
  LucideIcon,
  ShoppingBag,
  Tag,
  Van,
  Weight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BASE_URL = "/dashboard";

const SIDEBAR_ITEMS = [
  { to: BASE_URL, label: "Inicio", icon: Home },
  { to: `${BASE_URL}/categories`, label: "Categorías", icon: Tag },
  {
    to: `${BASE_URL}/units-of-measure`,
    label: "Unidades de medida",
    icon: Weight,
  },
  { to: `${BASE_URL}/products`, label: "Productos", icon: Box },
  { to: `${BASE_URL}/suppliers`, label: "Proveedores", icon: Van },
  { to: `${BASE_URL}/purchases`, label: "Compras", icon: ShoppingBag },
  { to: `${BASE_URL}/lots`, label: "Lotes", icon: Boxes },
  { to: `${BASE_URL}/sales`, label: "Ventas", icon: HandCoins },
];

export function SidebarContentApp() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarButton key={item.to} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

type SidebarButtonProps = {
  item: {
    to: string;
    label: string;
    icon: LucideIcon;
  };
};

export function SidebarButton({ item }: SidebarButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === item.to;
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <Button
        className={`w-full justify-start ${isActive ? "pointer-events-none bg-muted hover:bg-muted!" : ""}`}
        variant="ghost"
        asChild
        aria-current={isActive && "page"}
      >
        <Link href={item.to}>
          <Icon />
          <span>{item.label}</span>
        </Link>
      </Button>
    </SidebarMenuItem>
  );
}
