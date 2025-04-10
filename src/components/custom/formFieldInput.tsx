"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function FormFieldInput<T extends FieldValues>({
  name,
  label,
  control,
  className,
  inputType = "text",
}: {
  name: Path<T>;
  label: string;
  control: Control<T>;
  className?: string;
  inputType?: HTMLInputElement["type"];
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={inputType} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
