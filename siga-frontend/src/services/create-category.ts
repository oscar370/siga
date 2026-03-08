"use server";

import { api } from "@/lib/api-client";
import {
  CategoryBasic,
  CategoryCreate,
  categoryCreateSchema,
} from "@/types/category";
import z from "zod";

export async function createCategory(data: CategoryCreate) {
  const result = z.parse(categoryCreateSchema, data);
  const response = await api.post("/categories", result);
  return response.data as CategoryBasic;
}
