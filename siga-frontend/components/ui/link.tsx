import LinkNext, { LinkProps as LinkNextProps } from "next/link";
import { ComponentProps } from "react";
import { Button } from "./button";

type LinkProps = LinkNextProps &
  ComponentProps<"a"> & {
    variant?: "outline" | "link" | "secondary";
  };

export function Link({ variant = "link", ...props }: LinkProps) {
  return (
    <Button className="text-foreground" variant={variant} asChild>
      <LinkNext {...props} />
    </Button>
  );
}
