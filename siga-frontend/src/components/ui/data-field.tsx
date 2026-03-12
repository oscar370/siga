import { ReactNode } from "react";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./item";

type DataFieldProps =
  | { label: string; value: string | ReactNode; children?: never }
  | { label: string; value?: never; children: ReactNode };

export function DataField({ label, value, children }: DataFieldProps) {
  return (
    <Item className="p-0">
      <ItemContent>
        <ItemTitle>{label}</ItemTitle>
        {value ? <ItemDescription>{value}</ItemDescription> : children}
      </ItemContent>
    </Item>
  );
}
