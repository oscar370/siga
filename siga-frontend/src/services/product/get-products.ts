"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import {
  ProductsExtended,
  productsExtendedSchema,
} from "@/types/product/extended";

import * as z from "zod";

export async function getProducts() {
  try {
    const { data } = await api.get<ProductsExtended>("/products");
    const result = z.parse(productsExtendedSchema, data);

    return result;
  } catch (error) {
    await handleServiceError(error);
  }
}
