"use client";

import { UserWidget } from "@/components/ui/user-widget";
import { logout } from "@/features/auth/actions";
import { getUserOptions } from "@/lib/client/@tanstack/react-query.gen";
import { updateUserStore } from "@/stores/user-store";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function UserWidgetApp() {
  const { data } = useSuspenseQuery(getUserOptions());

  useEffect(() => {
    updateUserStore(data);
  }, [data]);

  return <UserWidget user={data} onLogout={handleLogout} />;
}

async function handleLogout() {
  updateUserStore({
    id: "",
    email: "",
    fullName: "",
    roles: [],
  });

  await logout();
}
