"use server";

import { ActionResult } from "@/types/common";
import z from "zod";
import { $ZodType, $ZodTypeInternals } from "zod/v4/core";

/* export async function handleServiceError(
  error: unknown,
): Promise<ServiceError> {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      return new ServiceError("Sesión invalida", status);
    }

    if (status === 400 && data?.errors) {
      const firstMsg = Object.values(data.errors).flat()[0] as string;
      return new ServiceError(firstMsg || "Datos inválidos", status);
    }

    console.error("Error del Servidor:", data || error.message);
    return new ServiceError(
      "El servicio no está disponible en este momento",
      500,
    );
  }

  if (error instanceof Error && error.name === "ZodError") {
    return new ServiceError("Los datos proporcionados no son válidos", 400);
  }

  console.error("Error desconocido:", error);
  return new ServiceError("Ocurrió un error inesperado", 500);
} */

export async function handleResponse<T>(
  response: Response,
  schema: $ZodType<T, T, $ZodTypeInternals<T, T>>,
): Promise<ActionResult<T>> {
  if (!response.ok) {
    if (response.status === 401) {
      return {
        ok: false,
        error: "Sesión inválida",
        code: response.status,
      };
    }

    if (response.status === 40) {
      const firstMsg = Object.values(await response.json()).flat()[0] as string;
      return {
        ok: false,
        error: firstMsg || "Datos inválidos",
        code: response.status,
      };
    }

    return {
      ok: false,
      error: "Ocurrió un error inesperado",
      code: response.status,
    };
  }

  const data = await response.json();
  const result = z.safeParse(schema, data);

  if (!result.success) {
    return {
      ok: false,
      error: "Datos inválidos",
      code: 400,
    };
  }

  return {
    ok: true,
    data: result.data,
  };
}
