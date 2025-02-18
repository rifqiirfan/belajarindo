"use client"

import { DatatableProvider } from "@/components/composite/datatable";
import {
  ColumnDef,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, TableOptions,
  useReactTable
} from "@tanstack/react-table";

type DatatableWrapperProps<DataType> = {
  data: DataType[],
  columns: ColumnDef<DataType>[],
  children: React.ReactNode,
  options?: Omit<TableOptions<DataType>, "data" | "columns" | "getCoreRowModel">
}

export default function DatatableWrapperClientSide<DataType>({ data, columns, children, options = {} }: DatatableWrapperProps<DataType>) {
  const table = useReactTable({
    ...options,
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <DatatableProvider data={{ table }}>
      {children}
    </DatatableProvider>
  )
}