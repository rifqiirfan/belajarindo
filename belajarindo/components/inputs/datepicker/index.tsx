"use client"
import { ControllerProps, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn, toCapitalizedWords } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { enUS } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { z } from "zod";

type InputSelectProps = {
  label: React.ReactNode
  description?: React.ReactNode
  className?: string
  required?: boolean
  disabled?: boolean,
  placeholder?: string,
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const dateSchema = z.coerce.date()

export default function DatePickerBasic<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  className,
  placeholder,
  required,
  disabled,
  inputProps,
  ...props
}: InputSelectProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
  const form = useFormContext<TFieldValues>()
  return (
    <FormField<TFieldValues, TName>
      control={form.control}
      {...props}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className={cn("text-foreground", required && "required")}>{label ? label : toCapitalizedWords(props.name)}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "flex w-full justify-between font-normal",
                    inputProps?.className,
                    error && "border-destructive",
                    !field.value && "text-muted-foreground",
                    disabled && "disabled:opacity-99"
                  )}
                  disabled={disabled}
                >
                  {field.value ? (
                    <span className="truncate">{format(new Date(field.value), "EEEE, dd MMMM yyyy", { locale: enUS })}</span>
                  ) : (
                    <span>{placeholder ? placeholder : "Pick a date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateSchema.safeParse(field.value).data}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function DatePickerBasicInline<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  className,
  placeholder,
  required,
  disabled,
  inputProps,
  ...props
}: InputSelectProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
  const form = useFormContext<TFieldValues>()
  return (
    <FormField<TFieldValues, TName>
      control={form.control}
      {...props}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn('space-y-0 md:flex md:items-center', className)}>
          <div className="md:w-1/3">
            <FormLabel className={cn("text-foreground", required && "required")}>{label ? label : toCapitalizedWords(props.name)}</FormLabel>
          </div>
          <div className="md:w-2/3 space-y-1">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "flex w-full justify-between font-normal",
                      inputProps?.className,
                      error && "border-destructive",
                      !field.value && "text-muted-foreground"
                    )}
                    disabled={disabled}
                  >
                    {field.value ? (
                      <span className="truncate">{format(new Date(field.value), "EEEE, dd MMMM yyyy", { locale: enUS })}</span>
                    ) : (
                      <span>{placeholder ? placeholder : "Pick a date"}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateSchema.safeParse(field.value).data}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}