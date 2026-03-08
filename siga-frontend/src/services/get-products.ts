"use server";

import { api } from "@/lib/api-client";
import { ProductsExtended, productsExtendedSchema } from "@/types/product";
import * as z from "zod";

export async function getProducts() {
  try {
    const { data } = await api.get<ProductsExtended>("/products");
    const result = z.parse(productsExtendedSchema, data);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error inesperado");
  }
}
