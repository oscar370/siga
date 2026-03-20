import { ProfileWidget } from "@/features/auth/components/profile-widget";
import { getUser } from "@/services/auth/get-user";
import { redirect } from "next/navigation";
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

export async function AppLayout({ children }: AppLayoutProps) {
  const user = await getUser();

  if (!user.ok) redirect("/auth/login");

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="h-(--header-height)">
          <ProfileWidget user={user.data} />
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
