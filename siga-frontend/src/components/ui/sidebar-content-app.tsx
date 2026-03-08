"use client";

import { Box, Boxes, Home, Tag, Van, Weight } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";
import { SidebarButton } from "./sidebar-button";

const BASE_URL = "/dashboard";

const SIDEBAR_ITEMS = [
  { to: BASE_URL, name: "Inicio", icon: Home },
  { to: `${BASE_URL}/categories`, name: "Categorías", icon: Tag },
  {
    to: `${BASE_URL}/units-of-measure`,
    name: "Unidades de medida",
    icon: Weight,
  },
  { to: `${BASE_URL}/products`, name: "Productos", icon: Box },
  { to: `${BASE_URL}/suppliers`, name: "Proveedores", icon: Van },
  { to: `${BASE_URL}/inventory`, name: "Inventario", icon: Boxes },
];

export function SidebarContentApp() {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {SIDEBAR_ITEMS.map((item) => (
              <SidebarButton key={item.to} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
