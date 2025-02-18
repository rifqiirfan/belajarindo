import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

export function SkeletonForm({className}: { className?: string }) {
    return (
        <div>
            <div className={cn("space-y-4", className)}>
                {
                    Array(5).fill(0).map((_, i) => (
                        <div key={i}>
                            <Skeleton className={"h-4 w-32 mb-2"} />
                            <Skeleton className={"h-9"}/>
                        </div>
                    ))
                }
            </div>
            <Skeleton className={"h-9 w-32 mt-4"}/>
        </div>
    )
}