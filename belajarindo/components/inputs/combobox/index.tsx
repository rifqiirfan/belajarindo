import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerProps, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn, toCapitalizedWords } from "@/lib/utils";
import { Check, ChevronsUpDown, RefreshCcw, XIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { CommandLoading } from "cmdk";
import { Skeleton } from "@/components/ui/skeleton";

export type Option = {
  label: React.ReactNode
  value: string
}

type InputComboboxProps = {
  label?: React.ReactNode
  description?: React.ReactNode
  className?: string
  required?: boolean
  disabled?: boolean
  onSelect?: ({ option }: any) => void
  onClear?: () => void
  queryOptions?: {
    queryKey: string[]
    queryFn: ({ search, value }: {
      search: string,
      value: string,
      disabled: boolean | undefined
    }) => Promise<Option[]>
  }
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export default function InputCombobox<
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
  queryOptions,
  ...props
}: InputComboboxProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
  const form = useFormContext<TFieldValues>()

  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const value = form.watch(props.name)

  const { data: options, isFetching, refetch } = useQuery({
    queryKey: ["form/combobox", { search: debouncedSearch, value, disabled }, ...(queryOptions?.queryKey || [])],
    queryFn: () => queryOptions?.queryFn({ search: debouncedSearch, value, disabled }),
    refetchOnMount: "always",
  })

  return (
    <FormField<TFieldValues, TName>
      {...props}
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          {label != '' && <FormLabel className={cn("text-foreground", required && "required")}>{label ? label : toCapitalizedWords(props.name)}</FormLabel>}
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
                        className="h-4 w-4 text-muted-foreground/85"
                      />
                    </div>
                    :
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/50" />
                  }
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="sm:w-48 md:w-96 p-0">
              <Command shouldFilter={false}>
                <CommandInput value={search} onValueChange={setSearch} placeholder={'Search...'} />
                <CommandList>
                  {isFetching &&
                    <CommandLoading>
                      <CommandGroup>
                        {
                          Array(5).fill(0).map((_, i) => (
                            <CommandItem key={i} className={"h-8 my-1"} asChild>
                              <Skeleton />
                            </CommandItem>
                          ))
                        }
                      </CommandGroup>
                    </CommandLoading>
                  }
                  {!isFetching && !options?.length && <CommandEmpty className="grid gap-1 pt-3">
                    <span className="inline-flex justify-center text-[13px] text-foreground">No option found.</span>
                    <Button variant={"link"} className={"text-xs text-muted-foreground hover:text-foreground"} onClick={(() => refetch())}>
                      Try Again
                      <RefreshCcw />
                    </Button>
                  </CommandEmpty>
                  }
                  {!isFetching &&
                    <>
                      {/* <CommandEmpty>
                                                No Result.
                                                <Button variant={"link"} className={"text-muted-foreground hover:text-foreground"} onClick={(() => refetch())}>
                                                    Try Again
                                                    <RefreshCcw/>
                                                </Button>
                                            </CommandEmpty> */}
                      <CommandGroup>
                        {options?.map((option) => (
                          <CommandItem
                            value={option.value}
                            key={option.value}
                            onSelect={() => {
                              if (field.value !== option.value) {
                                field.onChange(option.value)
                                onSelect?.({ option });
                              } else {
                                field.onChange("")
                                onClear?.()
                              }
                              setOpen(false)
                            }}
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
                        ))
                        }
                      </CommandGroup>
                    </>
                  }
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-xs font-normal text-destructive" />
        </FormItem>
      )}
    />
  )
}

export function InputComboboxInline<
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
  queryOptions,
  ...props
}: InputComboboxProps & Omit<ControllerProps<TFieldValues, TName>, "render" | "control">) {
  const form = useFormContext<TFieldValues>()

  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const value = form.watch(props.name)

  const { data: options, isFetching, refetch } = useQuery({
    queryKey: ["form/combobox", { search: debouncedSearch, value, disabled }, ...(queryOptions?.queryKey || [])],
    queryFn: () => queryOptions?.queryFn({ search: debouncedSearch, value, disabled }),
    refetchOnMount: "always",
  })

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
                          className="h-4 w-4 text-muted-foreground/85"
                        />
                      </div>
                      :
                      <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/50" />
                    }
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="sm:w-48 md:w-96 p-0">
                <Command shouldFilter={false}>
                  <CommandInput value={search} onValueChange={setSearch} placeholder={'Search...'} />
                  <CommandList>
                    {isFetching &&
                      <CommandLoading>
                        <CommandGroup>
                          {
                            Array(5).fill(0).map((_, i) => (
                              <CommandItem key={i} className={"h-8 my-1"} asChild>
                                <Skeleton />
                              </CommandItem>
                            ))
                          }
                        </CommandGroup>
                      </CommandLoading>
                    }
                    {!isFetching && !options?.length && <CommandEmpty className="grid gap-1 pt-3">
                      <span className="inline-flex justify-center text-[13px] text-foreground">No option found.</span>
                      <Button variant={"link"} className={"text-xs text-muted-foreground hover:text-foreground"} onClick={(() => refetch())}>
                        Try Again
                        <RefreshCcw />
                      </Button>
                    </CommandEmpty>
                    }
                    {!isFetching &&
                      <>
                        {/* <CommandEmpty>
                                                No Result.
                                                <Button variant={"link"} className={"text-muted-foreground hover:text-foreground"} onClick={(() => refetch())}>
                                                    Try Again
                                                    <RefreshCcw/>
                                                </Button>
                                            </CommandEmpty> */}
                        <CommandGroup>
                          {options?.map((option) => (
                            <CommandItem
                              value={option.value}
                              key={option.value}
                              onSelect={() => {
                                if (field.value !== option.value) {
                                  field.onChange(option.value)
                                  onSelect?.({ option });
                                } else {
                                  field.onChange("")
                                  onClear?.()
                                }
                                setOpen(false)
                              }}
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
                          ))
                          }
                        </CommandGroup>
                      </>
                    }
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="text-xs font-normal text-destructive" />
          </div>
        </FormItem>
      )}
    />
  )
}