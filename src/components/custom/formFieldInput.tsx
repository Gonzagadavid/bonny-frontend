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
import { ClipboardEventHandler } from "react";

export default function FormFieldInput<T extends FieldValues>({
  name,
  label,
  control,
  className,
  onPaste,
  inputType = "text",
}: {
  name: Path<T>;
  label: string;
  control: Control<T>;
  className?: string;
  inputType?: HTMLInputElement["type"];
  onPaste?: ClipboardEventHandler<HTMLInputElement>
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={inputType} onPaste={onPaste} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
