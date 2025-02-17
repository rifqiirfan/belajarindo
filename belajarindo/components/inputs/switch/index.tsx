
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerProps, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { cn, toCapitalizedWords } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

type SwitchBasicProps = {
  label?: React.ReactNode
  description?: React.ReactNode
  className?: string
  required?: boolean
  disabled?: boolean
  inputProps?: React.RefAttributes<HTMLButtonElement>
}

export default function SwitchBasic<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label, description, className, required, disabled, inputProps, ...props }: SwitchBasicProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
  const form = useFormContext<TFieldValues>()
  return (
    <FormField<TFieldValues, TName>
      {...props}
      control={form.control}
      render={({ field }) => (
        <FormItem className={cn("grid", className)}>
          <FormLabel className={cn("text-foreground mb-1", required && "required")}>{label ? label : toCapitalizedWords(props.name)}</FormLabel>

          <div className="flex items-center">
            <FormControl>
              <Switch
                {...field}
                {...inputProps}
                disabled={disabled}
                onCheckedChange={field.onChange}
                checked={field.value || false}
              />

            </FormControl>
            <span className="ml-1 font-medium text-muted-foreground text-xs">{field.value ? 'Yes' : 'No'}</span>
          </div>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}