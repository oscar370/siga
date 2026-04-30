import { useState } from "react";
import { DateRange } from "react-day-picker";

const now = new Date();

export function useFinancialSummary() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(now.getFullYear(), now.getMonth(), 1),
    to: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  });

  return {
    queryParams: {
      StartDate:
        date?.from?.toISOString() ??
        new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      EndDate:
        date?.to?.toISOString() ??
        new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        ).toISOString(),
    },
    date,
    setDate,
  };
}
