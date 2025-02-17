import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerProps, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { cn, toCapitalizedWords } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type TextareaBasicProps = {
  label?: React.ReactNode
  description?: React.ReactNode
  className?: string
  required?: boolean
  disabled?: boolean
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
}

export default function TextareaBasic<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label, description, className, required, disabled, inputProps, ...props }: TextareaBasicProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
  const form = useFormContext<TFieldValues>()
  return (
    <FormField<TFieldValues, TName>
      {...props}
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className={cn("text-foreground", required && "required")}>{label ? label : toCapitalizedWords(props.name)}</FormLabel>
          <FormControl>
            <Textarea
              {...inputProps}
              {...field}
              value={field.value || ""}
              required={false}
              disabled={disabled}
              error={!!error}
              rows={3}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}