import { RowData } from "@tanstack/react-table";
import { ZodError } from "zod";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    title?: string;
  }
}

export type ActionState<T> = {
  data?: T;
  errors?: ZodError<T>;
} | null;
