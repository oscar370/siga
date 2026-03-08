import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const isDev = process.env.NODE_ENV === "development";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function log(message: unknown) {
  if (!isDev) return;

  console.log(message);
}
