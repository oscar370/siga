"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { SidebarMenuItem } from "./sidebar";

type Item = {
  to: string;
  name: string;
  icon: LucideIcon;
};

type SidebarButtonProps = {
  item: Item;
};

export function SidebarButton({ item }: SidebarButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === item.to;
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <Button
        className={`w-full justify-start ${isActive ? "bg-muted hover:bg-muted! pointer-events-none" : ""}`}
        variant="ghost"
        asChild
        aria-current={isActive && "page"}
      >
        <Link href={item.to}>
          <Icon />
          <span>{item.name}</span>
        </Link>
      </Button>
    </SidebarMenuItem>
  );
}
