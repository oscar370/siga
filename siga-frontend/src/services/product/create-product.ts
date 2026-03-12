"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { ProductBasic } from "@/types/product/basic";
import { ProductCreate, productCreateSchema } from "@/types/product/create";
import z from "zod";

export async function createProduct(product: ProductCreate) {
  try {
    const result = z.parse(productCreateSchema, product);
    const { data } = await api.post("/products", result);
    return data as ProductBasic;
  } catch (error) {
    await handleServiceError(error);
  }
}
