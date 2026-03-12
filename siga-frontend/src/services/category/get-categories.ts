"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { categoriesBasicSchema } from "@/types/category/basic";
import * as z from "zod";

export async function getCategories() {
  try {
    const { data } = await api.get("/categories");
    const result = z.parse(categoriesBasicSchema, data);

    return result;
  } catch (error) {
    await handleServiceError(error);
  }
}
