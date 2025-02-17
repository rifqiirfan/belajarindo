import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {ControllerProps, FieldPath, FieldValues, useFormContext} from "react-hook-form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn, toCapitalizedWords} from "@/lib/utils";
import {Check, ChevronsUpDown, XIcon} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import React, {useState} from "react";

export type Option = {
    label: string,
    value: string
}

type InputSelectProps = {
    label: React.ReactNode
    description?: React.ReactNode
    className?: string
    required?: boolean
    disabled?: boolean
    onClear?: () => void
    onSelect?: ({option}: any) => void
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    options: Option[]
}

export default function InputSelect<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
      label,
      description,
      className,
      required,
      disabled,
      onClear,
      onSelect,
      inputProps,
      options,
      ...props
  }: InputSelectProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
    const form = useFormContext<TFieldValues>()

    const [open, setOpen] = useState(false)
    return (
        <FormField<TFieldValues, TName>
            {...props}
            control={form.control}
            render={({field, fieldState: {error}}) => (
                <FormItem className={className}>
                    <FormLabel
                        className={cn("text-foreground", required && "required")}>{label ? label : toCapitalizedWords(props.name)}</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    ref={field.ref}
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "flex w-full gap-2 font-normal focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-[99]",
                                        inputProps?.className,
                                        error && "border-destructive",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    disabled={disabled}
                                >
                                    <span className={"truncate"}>
                                        {field.value
                                            ? options?.find(
                                                (option) => option.value === field.value
                                                )?.label || field.value
                                            : inputProps?.placeholder || "Select..."
                                        }
                                    </span>
                                    {field.value
                                        ?
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                field.onChange("");
                                                onClear?.()
                                            }}
                                            className={"ml-auto shrink-0"}
                                        >
                                            <XIcon
                                                className="h-4 w-4 text-muted-foreground/50"
                                            />
                                        </div>
                                        :
                                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/50"/>
                                    }
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="p-0">
                            <Command>
                                <CommandInput placeholder="Search..."/>
                                <CommandList>
                                    <CommandEmpty>No Result.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                value={option.value}
                                                key={option.value}
                                                onSelect={() => {
                                                    if (field.value !== option.value) {
                                                        field.onChange(option.value)
                                                        onSelect?.({option});
                                                    } else {
                                                        field.onChange("")
                                                        onClear?.()
                                                    }
                                                    setOpen(false)
                                                }}
                                                keywords={[option.label]}
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto w-4 h-4 text-foreground",
                                                        option.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}