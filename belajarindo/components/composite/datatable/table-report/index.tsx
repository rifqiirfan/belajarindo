import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {flexRender} from "@tanstack/react-table";
import {useDatatableContext} from "@/components/composite/datatable";

export function DataTableReport({className, handleRowClick}: { className?: string, handleRowClick?: (val: any) => Promise<void> }) {
    const table = useDatatableContext()
    return (
        <div className="w-full">
            <div className="rounded-md border">
            <div className="max-h-[63vh] relative overflow-auto">
                <Table>
                    {/* <TableHeader className="sticky top-0 bg-secondary z-10"> */}
                    <TableHeader className="bg-secondary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-secondary-foreground" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="text-[0.85rem]">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => handleRowClick?.(row?.original)}
                                    className={handleRowClick ? "cursor-pointer" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="pl-3" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllLeafColumns().length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            </div>
        </div>
    )
}