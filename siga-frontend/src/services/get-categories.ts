"use server";

import { api } from "@/lib/api-client";
import { log } from "@/lib/utils";
import { categoriesBasicSchema, CategoriesBasicSchema } from "@/types/category";
import * as z from "zod";

export async function getCategories() {
  try {
    const { data } = await api.get<CategoriesBasicSchema>("/categories");
    const result = z.parse(categoriesBasicSchema, data);

    return result;
  } catch (error) {
    log((error as Error).message);
    return null;
  }
}
