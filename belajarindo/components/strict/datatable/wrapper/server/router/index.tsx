"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel, getSortedRowModel,
    PaginationState,
    RowSelectionState,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {useState} from "react";
import {DatatableProvider} from "@/components/composite/datatable";

type DatatableWrapperProps<DataType> = {
    data: DataType[],
    columns: ColumnDef<DataType>[],
    rowCount: number,
    children: React.ReactNode
}

export default function DatatableWrapperRouter<DataType>({data, columns, rowCount, children}: DatatableWrapperProps<DataType>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const sorting: SortingState = searchParams.get("sorting") ? JSON.parse(searchParams.get("sorting") as string) : []
    const columnVisibility: VisibilityState = searchParams.get("columnVisibility") ? JSON.parse(searchParams.get("columnVisibility") as string) : {}
    const pagination: PaginationState = searchParams.get("pagination") ? JSON.parse(searchParams.get("pagination") as string) : {
        pageIndex: 0,
        pageSize: 10
    }
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    const setQueryParams = (key: string, value: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set(key, value)
        router.replace(`${pathname}?${newSearchParams.toString()}`)
    }

    const table = useReactTable({
        data: data,
        columns: columns,
        rowCount: rowCount,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableColumnFilters: false,
        manualPagination: true,
        manualSorting: true,
        onPaginationChange: (updatePagination) => {
            setQueryParams("pagination", JSON.stringify(typeof updatePagination === "function" ? updatePagination(pagination) : updatePagination))
        },
        onSortingChange: (updateSorting) => {
            setQueryParams("sorting", JSON.stringify(typeof updateSorting === "function" ? updateSorting(sorting) : updateSorting))
        },
        onColumnVisibilityChange: (updateColumnVisibility) => {
            setQueryParams("columnVisibility", JSON.stringify(typeof updateColumnVisibility === "function" ? updateColumnVisibility(columnVisibility) : updateColumnVisibility))
        },
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            pagination,
            rowSelection
        }
    })

    return (
        <DatatableProvider data={{table}}>
            {children}
        </DatatableProvider>
    )
}