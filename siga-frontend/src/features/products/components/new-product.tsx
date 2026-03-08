"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getCategories } from "@/services/get-categories";
import { getUnitsOfMeasure } from "@/services/get-units-of-measure";
import { productCreateSchema } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createProduct } from "../../../services/create-product";

export function NewProduct() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productCreateSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("El producto se ha creado");
    },
    onError: (r) => toast.error(r.message),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: unitsOfMeasure } = useQuery({
    queryKey: ["units-of-measure"],
    queryFn: getUnitsOfMeasure,
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <FieldGroup>
        <Field>
          <FieldLabel>
            Nombre
            <span className="text-destructive">*</span>
          </FieldLabel>
          <Input {...register("name")} />
          <FieldError>{errors?.name?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>
            SKU
            <span className="text-destructive">*</span>
          </FieldLabel>
          <Input {...register("sku")} />
          <FieldError>{errors?.sku?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>
            Precio base
            <span className="text-destructive">*</span>
          </FieldLabel>
          <div className="relative">
            <Input
              {...register("basePrice", { valueAsNumber: true })}
              type="number"
            />
          </div>
          <FieldError>{errors?.basePrice?.message}</FieldError>
        </Field>

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Categoría
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                name={field.name}
                value={(field?.value as number)?.toString() ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría..." />
                </SelectTrigger>
                <SelectContent position="popper">
                  {categories &&
                    categories.map((c) => (
                      <SelectItem
                        key={c.id}
                        value={c.id.toString()}
                        className="text-ellipsis overflow-hidden whitespace-nowrap"
                      >
                        {c.name} {c.description && `- ${c.description}`}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FieldError>{errors?.categoryId?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          name="unityOfMeasureId"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Unidad de medida
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                name={field.name}
                value={(field.value as number)?.toString() ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una unidad de medida..." />
                </SelectTrigger>
                <SelectContent position="popper">
                  {unitsOfMeasure &&
                    unitsOfMeasure.map((um) => (
                      <SelectItem
                        key={um.id}
                        value={um.id.toString()}
                        className="text-ellipsis overflow-hidden whitespace-nowrap"
                      >
                        {um.name} - {um.abbreviation}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FieldError>{errors?.unityOfMeasureId?.message}</FieldError>
            </Field>
          )}
        />

        <Field>
          <FieldLabel>Descripción</FieldLabel>
          <Textarea {...register("description")} />
          <FieldError>{errors?.description?.message}</FieldError>
        </Field>
      </FieldGroup>

      <Button className="w-full mt-4" disabled={isPending}>
        {isPending ? <Spinner /> : "Guardar"}
      </Button>
    </form>
  );
}
