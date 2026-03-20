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
  "control" | "name" | "rules"
>;

type FormProps = ComponentProps<"form"> & {
  children: ReactNode;
};

function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={cn("space-y-2", className)} {...props}>
      {children}
    </form>
  );
}

type InputProps<T extends FieldValues> = ComponentProps<"input"> &
  TController<T> & {
    label: string;
  };

function Input<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  ...props
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {rules?.required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <InputBase
            {...props}
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

type DateTimeInputProps<T extends FieldValues> = ComponentProps<"input"> &
  TController<T> & {
    label: string;
  };

function DateTimeInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  ...props
}: DateTimeInputProps<T>) {
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
      rules={rules}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {rules?.required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <InputBase
            {...props}
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            className={cn(className)}
            value={toInputValue(field.value ?? "")}
            type="datetime-local"
            onChange={(e) =>
              field.onChange(
                e.target.value ? new Date(e.target.value).toISOString() : "",
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

type SelectProps<T extends FieldValues> = TController<T> & {
  label: string;
  placeholder: string;
  children: ReactNode;
};

function Select<T extends FieldValues>({
  label,
  placeholder,
  children,
  control,
  name,
  rules,
}: SelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.name}>
              {label}
              {rules?.required && <span className="text-destructive">*</span>}
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

type TextareaProps<T extends FieldValues> = ComponentProps<"textarea"> &
  TController<T> & {
    label: string;
  };

function Textarea<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  className,
  ...props
}: TextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {rules?.required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <TextareaBase
            {...props}
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

type FieldSetProps = {
  title?: string;
  description?: string;
  classNames?: {
    fieldset?: string;
    title?: string;
    description?: string;
    fieldGroup?: string;
  };
  children: ReactNode;
};

function FieldSet({ title, description, classNames, children }: FieldSetProps) {
  return (
    <FieldSetBase className={cn(classNames?.fieldset)}>
      {title && (
        <FieldLegend className={cn(classNames?.title)}>{title}</FieldLegend>
      )}

      {description && (
        <FieldDescription className={cn(classNames?.description)}>
          {description}
        </FieldDescription>
      )}

      <FieldGroup className={cn(classNames?.fieldGroup)}>{children}</FieldGroup>
    </FieldSetBase>
  );
}

Form.Input = Input;
Form.DateTimeInput = DateTimeInput;
Form.Select = Select;
Form.Textarea = Textarea;
Form.FieldSet = FieldSet;

export { Form };
