import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerProps, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn, toCapitalizedWords } from "@/lib/utils";

type InputBasicProps = {
    label?: React.ReactNode
    description?: React.ReactNode
    className?: string
    required?: boolean
    disabled?: boolean
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    placeholder?: string
}

export default function InputBasic<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label, description, className, required, disabled, inputProps, placeholder, ...props }: InputBasicProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
    const form = useFormContext<TFieldValues>()
    return (
        <FormField<TFieldValues, TName>
            {...props}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={className}>
                    <FormLabel className={cn("text-foreground", required && "required")}>{label ? label : toCapitalizedWords(props.name)}</FormLabel>
                    <FormControl>
                        <Input
                            {...inputProps}
                            {...field}
                            value={field.value || ""}
                            required={false}
                            disabled={disabled}
                            error={error ? true : false}
                            placeholder={placeholder}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export function InputBasicInline<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ label, description, className, required, disabled, inputProps, ...props }: InputBasicProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
    const form = useFormContext<TFieldValues>()
    return (
        <FormField<TFieldValues, TName>
            {...props}
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={cn('space-y-0 md:flex md:items-center', className)}>
                    <div className="md:w-1/3">
                        <FormLabel className={cn("text-foreground", required && "required")}>{label ? label : toCapitalizedWords(props.name)}</FormLabel>
                    </div>
                    <div className="md:w-2/3 space-y-1">
                        <FormControl>
                            <Input
                                {...inputProps}
                                {...field}
                                value={field.value || ""}
                                required={false}
                                disabled={disabled}
                                error={!!error}
                            />
                        </FormControl>
                        {description && <FormDescription>{description}</FormDescription>}
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    )
}