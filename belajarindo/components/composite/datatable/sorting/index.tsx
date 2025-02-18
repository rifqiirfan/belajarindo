"use client"

import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ArrowDown, ArrowUp, EyeOff, ChevronsUpDown} from "lucide-react";
import {Column} from "@tanstack/table-core";
import {cn, toCapitalizedWords} from "@/lib/utils";
import {ColumnDef} from "@tanstack/react-table";

export function HeaderSort<ColumnType>({column, children, className}: {column: Column<ColumnType>, children: React.ReactNode, className?: string}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={cn("capitalize", className)}>
                <Button className="px-1" variant="ghost">
                    {children}
                    <ChevronsUpDown className={"ml-2"}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuCheckboxItem checked={column.getIsSorted() === "asc"} onCheckedChange={(v) => v ? column.toggleSorting(false) : column.clearSorting()}>
                    <span>Asc</span>
                    <ArrowUp className={"w-4 h-4 ml-auto text-muted-foreground"}/>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={column.getIsSorted() === "desc"} onCheckedChange={(v) => v ? column.toggleSorting(true) : column.clearSorting()}>
                    <span>Desc</span>
                    <ArrowDown className={"w-4 h-4 ml-auto text-muted-foreground"}/>
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator/>
                <DropdownMenuCheckboxItem onCheckedChange={() => column.toggleVisibility(false)}>
                    <span>Hide</span>
                    <EyeOff className={"w-4 h-4 ml-auto text-muted-foreground"}/>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function generateSortableColumn<T>(accessorKey: keyof T | string, name?: string): ColumnDef<T> {
    return {
        accessorKey,
        // header: ({column}) => name || toCapitalizedWords(accessorKey as string),
        header: ({column}) => <HeaderSort column={column}>{name || toCapitalizedWords(accessorKey as string)}</HeaderSort>,
        meta: {
            name: name || toCapitalizedWords(accessorKey as string)
        }
    }
}