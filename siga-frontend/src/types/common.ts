import { RowData } from "@tanstack/react-table";
import z from "zod";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    title?: string;
  }
}

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

export const statusSchema = z.coerce.number().min(0).max(1); // "Completed", "Cancelled"
