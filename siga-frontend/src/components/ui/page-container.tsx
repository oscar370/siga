"use client";

import { useCanGoBack } from "@/hooks/use-can-go-back";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { BackButton } from "./back-button";
import { SidebarTrigger } from "./sidebar";

type PageContainerProps = {
  title: string;
  isSubPage?: boolean;
  classNames?: {
    content?: string;
  };
  actions?: ReactNode;
  children: ReactNode;
};

export function PageContainer({
  title,
  isSubPage = false,
  classNames,
  actions,
  children,
}: PageContainerProps) {
  const canGoBack = useCanGoBack();
  return (
    <>
      <header className="w-full flex items-center justify-center h-(--header-height) px-1">
        <ul className="w-full grid grid-cols-3 items-center justify-center">
          {isSubPage && canGoBack ? <BackButton /> : <SidebarTrigger />}

          <li className="col-start-2 text-center">
            <h1 className="font-bold">{title}</h1>
          </li>

          <li className="w-full flex justify-end">{actions}</li>
        </ul>
      </header>

      <div className={cn("container mx-auto px-1 py-4", classNames?.content)}>
        {children}
      </div>
    </>
  );
}
