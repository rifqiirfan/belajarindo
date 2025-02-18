import { Muted, Small } from "@/components/typography";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useDatatableContext } from "@/components/composite/datatable";
import { cn } from "@/lib/utils";

const rows = [5, 10, 20, 50, 100];
const RowPerPage = ({ className }: { className?: string }) => {
  const table = useDatatableContext()
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      {/* <Small>Rows per page</Small> */}
      <Small>Rows</Small>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto px-3 h-8 w-[64px]">
            {table.getState().pagination.pageSize} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {rows.map((row) => {
            return (
              <DropdownMenuCheckboxItem
                key={row}
                className="capitalize"
                checked={row === table.getState().pagination.pageSize}
                onCheckedChange={() => table.setPageSize(row)}
              >
                {row}
              </DropdownMenuCheckboxItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/* V.1 Version */
const RowPerPageOldVersion = ({ className }: { className?: string }) => {
  const table = useDatatableContext()
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <Small>Rows per page</Small>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            {table.getState().pagination.pageSize} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {rows.map((row) => {
            return (
              <DropdownMenuCheckboxItem
                key={row}
                className="capitalize"
                checked={row === table.getState().pagination.pageSize}
                onCheckedChange={() => table.setPageSize(row)}
              >
                {row}
              </DropdownMenuCheckboxItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const PageCount = () => {
  const table = useDatatableContext()
  return (
    <Small>
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </Small>
  )
}

// TODO: MAKE SURE COMPONENT KNOW WHEN TO USE SERVER OR CLIENT
// SERVER USE PRE-PAGINATION
// CLIENT USE FILTERED PAGINATION
const PageEntries = () => {
  const table = useDatatableContext()
  const initialRowCount = table.getState().pagination.pageIndex * table.getState().pagination.pageSize
  return (
    <>
      <Muted>
        Showing {initialRowCount + 1} to {initialRowCount + table.getPaginationRowModel().rows.length} from {table.getRowCount()} row(s)
      </Muted>
      {/*<Muted>*/}
      {/*    Showing {table.getPaginationRowModel().rows.length} of {table.getState().pagination.pageSize} from {table.getRowCount()}*/}
      {/*</Muted>*/}
    </>
  )
}

const RowSelected = () => {
  const table = useDatatableContext()
  return (
    <Muted>
      {table.getSelectedRowModel().rows.length} of {table.getRowCount()} row(s) selected
    </Muted>
  )
}

export { RowPerPage, PageCount, PageEntries, RowSelected }