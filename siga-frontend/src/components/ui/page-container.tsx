"use client";

import { BackButton } from "./back-button";
import { SidebarTrigger } from "./sidebar";

type PageContainerProps = {
  title: string;
  isSubPage?: boolean;
  children: React.ReactNode;
};

export function PageContainer({
  title,
  isSubPage = false,
  children,
}: PageContainerProps) {
  return (
    <>
      <header className="w-full flex items-center justify-center h-(--header-height) px-1">
        <ul className="w-full grid grid-cols-3 items-center justify-center">
          {isSubPage ? <BackButton /> : <SidebarTrigger />}

          <li className="col-start-2 text-center">
            <h1 className="font-bold">{title}</h1>
          </li>
        </ul>
      </header>

      <div className="max-w-150 mx-auto px-1 py-4">{children}</div>
    </>
  );
}
