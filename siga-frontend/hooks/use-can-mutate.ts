import { useUserStore } from "@/stores/user-store";

export function useCanMutate() {
  const roles = useUserStore((state) => state.roles);

  return roles.includes("Admin");
}
