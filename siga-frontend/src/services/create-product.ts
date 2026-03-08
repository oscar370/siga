"use server";

import { api } from "@/lib/api-client";
import {
  ProductBasic,
  ProductCreate,
  productCreateSchema,
} from "@/types/product";
import { isAxiosError } from "axios";
import z from "zod";

export async function createProduct(data: ProductCreate) {
  try {
    const result = z.parse(productCreateSchema, data);
    const response = await api.post("/products", result);
    return response.data as ProductBasic;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    console.log(error);
    throw new Error("Error inesperado");
  }
}
