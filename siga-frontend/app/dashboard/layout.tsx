import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getUserOptions } from "@/lib/client/@tanstack/react-query.gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { SidebarContentApp } from "./sidebar-content";
import { UserWidgetApp } from "./user-widget-app";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const queryClient = new QueryClient();
  const user = await queryClient
    .ensureQueryData(getUserOptions())
    .catch(() => null);

  if (!user) redirect("/auth/login");

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <UserWidgetApp />
          </HydrationBoundary>
        </SidebarHeader>

        <SidebarContent>
          <SidebarContentApp />
        </SidebarContent>
      </Sidebar>

      {children}
    </SidebarProvider>
  );
}
