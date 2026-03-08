"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Button } from "./button";

const subscribe = () => () => {};

export function BackButton() {
  const router = useRouter();
  const canGoBack = useSyncExternalStore(
    subscribe,
    () => window.history.length > 0,
    () => false,
  );

  if (!canGoBack) return null;

  return (
    <li className="items-start">
      <Button
        variant="ghost"
        aria-label="Volver a la página anterior"
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </Button>
    </li>
  );
}
