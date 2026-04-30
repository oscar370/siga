import { UserDto } from "@/lib/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = UserDto;

const INITIAL_STATE: UserState = {
  id: "",
  email: "",
  fullName: "",
  roles: [],
};

export const useUserStore = create<UserState>()(
  persist(() => INITIAL_STATE, { name: "user-store" })
);

export function updateUserStore(updates: Partial<UserState>) {
  useUserStore.setState(updates);
}
