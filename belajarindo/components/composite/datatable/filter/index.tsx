"use client"

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input";
import { cn, toCapitalizedWords } from "@/lib/utils";
import { useDatatableContext } from "@/components/composite/datatable";
import { Info, Search, SearchIcon, X, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const DEBOUNCE_TIME_OUT = 500

function fieldsFilter(fields?: Object) {
  if (!fields) return "Fields: Undefined"

  const fieldNames = Object.keys(fields)
    .map(field => {
      const capitalize = field.replace(/^(gr|po)_/i, match => match.toUpperCase())
      return toCapitalizedWords(capitalize);
    })

  return `Fields: ${fieldNames.join(', ')}`;
}

function SearchTip({ fields }: { fields?: Object }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"link"} size={"icon"} className={"absolute right-0 top-0 text-gray-700"}>
          <Info size={14} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{fieldsFilter(fields)}</p>
      </TooltipContent>
    </Tooltip>
  )
}

type SearchInputProps = {
  className?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  noValueSlot?: React.ReactNode
  valueSlot?: React.ReactNode
}

function SearchInput({ className, placeholder, value, onChange, noValueSlot, valueSlot }: SearchInputProps) {
  return (
    <>
      <div className={cn("relative w-[164px] lg:w-[256px]", className)}>
        <Input
          className={"md:text-sm focus-visible:ring-slate-400"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Search..."}
        />
        {!value && <div className="absolute top-0 right-0 h-9 w-9 border-input flex justify-center items-center">
          <Search className="text-muted-foreground" size={16} />
        </div>
        }
        {/* {!value && <div className="absolute top-0 right-0 h-9 w-9 border rounded-r-md border-input flex justify-center items-center bg-slate-50">
          <Search className="text-muted-foreground" size={14} />
        </div>
        } */}
        {value && valueSlot}
      </div>
      {value && (
        <Button variant="outline" onClick={() => onChange("")} className="h-8 px-2 lg:px-3 text-sm border-dashed">
          Clear
          <X size={12} />
        </Button>
      )}
    </>
  )
}

/* V.1 Version */
function SearchInputOldVersion({ className, placeholder, value, onChange, noValueSlot }: SearchInputProps) {
  return (
    <div className={cn("relative w-64", className)}>
      <Input
        className={"w-full pl-8"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
      />
      <SearchIcon className="absolute top-2.5 left-2.5 text-muted-foreground h-4 w-4" />
      {value && <Button variant={"link"} size={"icon"} onClick={() => onChange("")}
        className={"absolute right-0 top-0 text-muted-foreground hover:text-foreground"}>
        <XIcon className="h-4 w-4" />
      </Button>}
      {!value && noValueSlot}
    </div>
  )
}

type FilterProps = {
  className?: string
  placeholder?: string
  fields?: Object
}

export function FilterRouter({ className, placeholder, fields }: FilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [value, setValue] = useState(searchParams.get("q") || "")

  const debouncedValue = useDebounce(value, DEBOUNCE_TIME_OUT)

  useEffect(() => {
    // depend on debouncedValue only to avoid refetching when searchParams change in other places
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set("q", debouncedValue)
    const pagination = newSearchParams.get("pagination")

    if (pagination) {
      try {
        newSearchParams.set("pagination", JSON.stringify({
          ...JSON.parse(pagination),
          pageIndex: 0
        }))
      } catch (e) {
        newSearchParams.set("pagination", JSON.stringify({ pageIndex: 0, pageSize: 10 }))
      }
    } else {
      newSearchParams.set("pagination", JSON.stringify({ pageIndex: 0, pageSize: 10 }))
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`)
  }, [debouncedValue])

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      className={className}
      placeholder={placeholder}
      // noValueSlot={<SearchTip fields={fields} />}
      valueSlot={<SearchTip fields={fields} />}
    />
  )
}

export function FilterClient({ className, placeholder }: Omit<FilterProps, "fields">) {
  const table = useDatatableContext()
  const [value, setValue] = useState("")

  const debouncedValue = useDebounce(value, DEBOUNCE_TIME_OUT)

  useEffect(() => {
    table.setGlobalFilter(debouncedValue)
  }, [debouncedValue]);

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      className={className}
      placeholder={placeholder}
    />
  )
}

export function FilterState({ className, placeholder, fields = {} }: FilterProps) {
  const table = useDatatableContext()
  const [value, setValue] = useState(table.getState().globalFilter)
  const timeoutRef = useRef<any>(null);

  const handleChange = (value: string) => {
    setValue(value)

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      table.setState((old) => ({
        ...old,
        globalFilter: value,
        pagination: {
          ...old.pagination,
          pageIndex: 0,
        },
      }));
    }, DEBOUNCE_TIME_OUT);
  }

  return (
    <SearchInput
      value={value}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
      // noValueSlot={<SearchTip fields={fields} />}
      valueSlot={<SearchTip fields={fields} />}
    />
  )
}