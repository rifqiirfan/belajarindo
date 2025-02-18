import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function SkeletonDatatable() {
    return (
        <div className={"space-y-4"}>
            <div className={"flex items-center gap-2 md:gap-4"}>
                <div className="flex items-center gap-2 md:gap-4">
                    <Skeleton className={"h-9 w-32"} />
                </div>
                <div className="ml-auto flex items-center gap-2 md:gap-4">
                    <Skeleton className={"h-9 w-32 ml-auto"} />
                    <Skeleton className={"bg-primary/50 h-9 w-20 ml-auto"} />
                </div>
            </div>
            {/* <Skeleton className={"h-96"} /> */}
            <div className={"rounded-md border"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array(5).fill(0).map((_, i) => {
                                return (
                                    <TableHead className="px-3" key={i}>
                                        <Skeleton className={"h-4 w-32"} />
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array(5).fill(0).map((_, i) => {
                            return (
                                <TableRow key={i}>
                                    {Array(5).fill(0).map((val, index) => {
                                        return (
                                            <TableCell className="pl-3" key={index}>
                                                <Skeleton className={"h-4 w-full"} />
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className={"flex items-center gap-2 md:gap-4"}>
                <Skeleton className={"h-9 w-32"} />
                <Skeleton className={"h-9 w-32 ml-auto"} />
                <Skeleton className={"h-9 w-64"} />
            </div>
        </div>
    )
}