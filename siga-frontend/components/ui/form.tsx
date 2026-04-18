import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet as FieldSetBase,
} from "./field";
import { Input as InputBase } from "./input";
import {
  Select as SelectBase,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea as TextareaBase } from "./textarea";

type TController<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  "control" | "name"
>;

type FormProps = ComponentProps<"form"> & {
  children: ReactNode;
};

export function Form({ children, className, ...props }: FormProps) {
  return (
    <form
      className={cn("mx-auto w-full max-w-lg space-y-2", className)}
      autoComplete="off"
      {...props}
    >
      {children}
    </form>
  );
}

type FormInputProps<T extends FieldValues> = TController<T> & {
  label: string;
  className?: string;
  type?: string;
  isRequired?: boolean;
};

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  className = "",
  type,
  isRequired,
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {isRequired && <span className="text-destructive">*</span>}
          </FieldLabel>
          <InputBase
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            className={cn(className)}
            type={type}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

type FormDateTimeInputProps<T extends FieldValues> = TController<T> & {
  label: string;
  className?: string;
  isRequired?: boolean;
};

export function FormDateTimeInput<T extends FieldValues>({
  name,
  control,
  label,
  className = "",
  isRequired,
}: FormDateTimeInputProps<T>) {
  function toInputValue(iso: string) {
    if (!iso) return "";
    const date = new Date(iso);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {isRequired && <span className="text-destructive">*</span>}
          </FieldLabel>
          <InputBase
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            className={cn(className)}
            value={toInputValue(field.value ?? "")}
            type="datetime-local"
            onChange={(e) =>
              field.onChange(
                e.target.value ? new Date(e.target.value).toISOString() : ""
              )
            }
            onBlur={field.onBlur}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

type FormSelectProps<T extends FieldValues> = TController<T> & {
  label: string;
  placeholder: string;
  children: ReactNode;
  isRequired?: boolean;
};

export function FormSelect<T extends FieldValues>({
  label,
  placeholder,
  children,
  control,
  name,
  isRequired,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.name}>
              {label}
              {isRequired && <span className="text-destructive">*</span>}
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <SelectBase
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">{children}</SelectContent>
          </SelectBase>
        </Field>
      )}
    />
  );
}

type FormTextAreaProps<T extends FieldValues> = TController<T> & {
  label: string;
  className?: string;
  isRequired?: boolean;
};

export function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  className = "",
  isRequired,
}: FormTextAreaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {isRequired && <span className="text-destructive">*</span>}
          </FieldLabel>
          <TextareaBase
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            className={cn(className)}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

type FormFieldSetProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function FormFieldSet({
  title,
  description,
  children,
}: FormFieldSetProps) {
  return (
    <FieldSetBase>
      {title && <FieldLegend>{title}</FieldLegend>}

      {description && <FieldDescription>{description}</FieldDescription>}

      <FieldGroup>{children}</FieldGroup>
    </FieldSetBase>
  );
}
