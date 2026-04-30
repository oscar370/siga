"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ErrorContent } from "@/components/ui/error-content";
import { Field } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SkeletonText } from "@/components/ui/skeleton-text";
import { getFinancialSummaryOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useFinancialSummary } from "./use-financial-summary";

export function FinancialSummary() {
  const { date, setDate, queryParams } = useFinancialSummary();
  const { data, isError, isLoading } = useQuery(
    getFinancialSummaryOptions({ query: queryParams })
  );

  if (isError) return <ErrorContent />;

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2>Resumen Financiero</h2>

        <Field className="w-fit">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker-range"
                className="justify-start px-2.5 font-normal"
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                required
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </Field>
      </div>

      {isLoading && <SkeletonText />}
      {data && (
        <ItemGroup className="flex-row">
          <Item variant="muted">
            <ItemContent>
              <ItemTitle className="text-blue-900 dark:text-blue-400">
                $ {data.grossProfit}
              </ItemTitle>
              <ItemDescription>Beneficio bruto</ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="muted">
            <ItemContent className="text-green-900 dark:text-green-400">
              <ItemTitle>$ {data.totalRevenue}</ItemTitle>
              <ItemDescription>Ganancia total</ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="muted">
            <ItemContent>
              <ItemTitle className="text-red-900 dark:text-red-400">
                $ {data.totalCostOfGoodsSold}
              </ItemTitle>
              <ItemDescription>
                Costo total de los bienes vendidos
              </ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      )}
    </section>
  );
}
