import { Pagination as PaginationUI, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftToLine, ArrowRight, ArrowRightToLine, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useDatatableContext } from "@/components/composite/datatable";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

function TooltipPagination({ children, content }: { children: React.ReactNode, content: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function Pagination({ className }: { className?: string }) {
  const table = useDatatableContext()
  return (
    <>
      <div className="flex w-[100px] items-center justify-center text-sm text-muted-foreground font-normal">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <TooltipPagination content={"Go to first page"}>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft size={16} />
          </Button>
        </TooltipPagination>
        <TooltipPagination content={"Go to previous page"}>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft size={16} />
          </Button>
        </TooltipPagination>
        <TooltipPagination content={"Go to next page"}>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight size={16} />
          </Button>
        </TooltipPagination>
        <TooltipPagination content={"Go to last page"}>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight size={16} />
          </Button>
        </TooltipPagination>
      </div>
    </>
  )
}

/* V.1 Version */
export function PaginationOldVersion({ className }: { className?: string }) {
  const table = useDatatableContext()
  return (
    <PaginationUI className={cn("", className)}>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"ghost"}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={"First Page"}
          >
            <ArrowLeftToLine className="h-4 w-4 md:mr-2" />
            <span className={"sr-only md:not-sr-only whitespace-nowrap"}>
              First
            </span>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={"Previous Page"}
          >
            <ArrowLeft className="h-4 w-4 md:mr-2" />
            <span className={"sr-only md:not-sr-only whitespace-nowrap"}>
              Previous
            </span>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive className={"w-fit px-2"}>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label={"Next Page"}
          >
            <span className={"sr-only md:not-sr-only whitespace-nowrap"}>
              Next
            </span>
            <ArrowRight className="h-4 w-4 md:ml-2" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            aria-label={"Last Page"}
          >
            <span className={"sr-only md:not-sr-only whitespace-nowrap"}>
              Last
            </span>
            <ArrowRightToLine className="h-4 w-4 md:ml-2" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  )
}