"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { SidebarTrigger } from "./sidebar";

let internalHistoryCount = 0;

export function useCanGoBack() {
  const pathname = usePathname();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    internalHistoryCount++;
    setCanGoBack(internalHistoryCount > 1);
  }, [pathname]);

  return canGoBack;
}

export function useIsSubPage(depth: number) {
  const pathname = usePathname();
  const isSubPage = pathname.split("/").filter(Boolean).length > depth;

  return isSubPage;
}

type PageContainerProps = {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function PageContainer({
  title,
  actions,
  children,
}: PageContainerProps) {
  const isSubPage = useIsSubPage(2);
  const canGoBack = useCanGoBack();

  return (
    <div className="w-full">
      <header className="grid h-12 w-full grid-cols-3 items-center justify-center px-1">
        {isSubPage && canGoBack ? <BackButton /> : <SidebarTrigger />}

        <h1 className="text-center font-bold">{title}</h1>

        {actions}
      </header>

      <main className="container mx-auto flex flex-col gap-2 px-1 py-4">
        {children}
      </main>
    </div>
  );
}

function BackButton() {
  const router = useRouter();

  return (
    <li className="list-none items-start">
      <Button
        variant="ghost"
        aria-label="Back to the previous page"
        className="size-7 p-0"
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </Button>
    </li>
  );
}
