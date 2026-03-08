import { AppLayout } from "@/components/layouts/app-layout";

export default function Layout({ children }: LayoutProps<"/dashboard">) {
  return <AppLayout>{children}</AppLayout>;
}
