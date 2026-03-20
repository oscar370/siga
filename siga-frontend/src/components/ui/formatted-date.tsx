"use client";

import { useEffect, useState } from "react";

export function FormattedDate({ value }: { value: string }) {
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplay(new Date(value).toLocaleString());
  }, [value]);

  return <span>{display ?? value}</span>;
}
