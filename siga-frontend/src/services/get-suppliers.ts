"use server";

import { api } from "@/lib/api-client";
import { log } from "@/lib/utils";
import { SuppliersBasic, suppliersBasicSchema } from "@/types/supplier";
import * as z from "zod";

export async function getSuppliers() {
  try {
    const { data } = await api.get<SuppliersBasic>("/suppliers");
    const result = z.parse(suppliersBasicSchema, data);

    return result;
  } catch (error) {
    log((error as Error).message);
    return null;
  }
}
