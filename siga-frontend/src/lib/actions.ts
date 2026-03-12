"use server";

import { isAxiosError } from "axios";

export async function handleServiceError(error: unknown) {
  if (isAxiosError(error)) {
    console.log(error.response?.data);
  }
  console.log(error);

  throw new Error("Error inesperado");
}
