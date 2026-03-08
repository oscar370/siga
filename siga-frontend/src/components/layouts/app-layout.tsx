import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "../ui/sidebar";
import { SidebarContentApp } from "../ui/sidebar-content-app";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="h-(--header-height)">
          <Link
            className="w-full flex items-center justify-center font-bold cursor-pointer"
            href="/"
          >
            SIGA
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarContentApp />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>

      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
