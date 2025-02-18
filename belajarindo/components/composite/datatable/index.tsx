"use client"

import {createContext, useContext} from "react";
import {Table} from "@tanstack/react-table";
import {DataTable} from "./table";
import {Pagination} from "./pagination";
import {Visibility} from "./visibility";
import {PageEntries, PageCount, RowPerPage, RowSelected} from "./indicator"
import {HeaderSort} from "@/components/composite/datatable/sorting";
import {FilterClient, FilterRouter, FilterState} from "@/components/composite/datatable/filter";

const datatableContext = createContext<{ table?: Table<any> }>({})

export function useDatatableContext() {
    const {table} = useContext(datatableContext)

    if (!table) {
        throw new Error("useDatatableContext must be used within a DatatableProvider")
    }

    return table
}

export function DatatableProvider<TTable>({children, data:{table}}: {children: React.ReactNode, data: {table: Table<TTable>}}) {
    return (
        <datatableContext.Provider value={{table}}>
            {children}
        </datatableContext.Provider>
    )
}



export {
    DataTable,
    Pagination,
    Visibility,
    PageEntries,
    PageCount,
    RowPerPage,
    RowSelected,
    HeaderSort,
    FilterClient,
    FilterRouter,
    FilterState,
}





