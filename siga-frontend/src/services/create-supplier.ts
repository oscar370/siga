"use server";

import { api } from "@/lib/api-client";
import {
  SupplierBasic,
  SupplierCreate,
  supplierCreateSchema,
} from "@/types/supplier";
import z from "zod";

export async function createSupplier(data: SupplierCreate) {
  const result = z.parse(supplierCreateSchema, data);
  const response = await api.post("/suppliers", result);
  return response.data as SupplierBasic;
}
