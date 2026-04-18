"use client";

import { useMemo } from "react";

type LocalDateProps = {
  date: string;
  options?: Intl.DateTimeFormatOptions;
  fallback?: string;
  className?: string;
};

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: undefined,
  timeZoneName: undefined,
};

export function LocalDate({
  date,
  options = DEFAULT_OPTIONS,
  fallback = "Fecha inválida",
  className,
}: LocalDateProps) {
  const { formatted, iso } = useMemo(() => {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      return { formatted: null, iso: null };
    }
    return {
      formatted: new Intl.DateTimeFormat("default", options).format(parsed),
      iso: parsed.toISOString(),
    };
  }, [date, options]);

  if (!formatted || !iso) {
    return (
      <span className={className} aria-invalid>
        {fallback}
      </span>
    );
  }

  return (
    <time dateTime={iso} className={className} title={iso}>
      {formatted}
    </time>
  );
}
