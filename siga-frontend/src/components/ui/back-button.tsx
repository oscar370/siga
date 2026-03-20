"use client";

import { useCanGoBack } from "@/hooks/use-can-go-back";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function BackButton() {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  if (!canGoBack) return null;

  return (
    <li className="list-none items-start">
      <Button
        variant="ghost"
        aria-label="Volver a la página anterior"
        className="p-0 size-7"
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </Button>
    </li>
  );
}
