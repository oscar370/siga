import { ActionResult } from "@/types/common";
import { z } from "zod";

export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): ActionResult<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const error =
      z.treeifyError(result.error).errors[0] ?? "Error de validación";
    console.error(error, result.error.message);
    return {
      ok: false,
      message: error,
    };
  }
  return { ok: true, data: result.data };
}

export async function fromResponse<T>(
  response: Response,
): Promise<ActionResult<T>> {
  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    const error = problem?.detail ?? "Error del servidor";
    console.error(error);
    return {
      ok: false,
      message: error,
    };
  }
  return { ok: true, data: await response.json() };
}
