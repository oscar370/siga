import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { UserWidget } from "@/components/ui/user-widget";
import { getUser } from "@/lib/client/sdk.gen";
import { serverClient } from "@/lib/server-client";
import { redirect } from "next/navigation";
import { SidebarContentApp } from "./sidebar-content";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const user = await getUser({ client: serverClient }).catch(() => null);

  if (user?.error || !user?.data) redirect("/auth/login");

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <UserWidget user={user.data} />
        </SidebarHeader>

        <SidebarContent>
          <SidebarContentApp />
        </SidebarContent>
      </Sidebar>

      {children}
    </SidebarProvider>
  );
}
