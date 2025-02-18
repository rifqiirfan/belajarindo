import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useDatatableContext } from "@/components/composite/datatable";

export function Visibility({ className }: { className?: string }) {
	const table = useDatatableContext()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className={className}>
				<Button variant="outline" size="sm" className="gap-2 ml-auto hidden h-8 lg:flex">
					{/* <Settings2 className="size-4" /> */}
					<SlidersHorizontal size={16} />
					Display
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) =>
									column.toggleVisibility(!!value)
								}
							>
								{column.columnDef.meta?.name || column.id}
							</DropdownMenuCheckboxItem>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

/* V.1 Version */
export function VisibilityOldVersion({ className }: { className?: string }) {
	const table = useDatatableContext()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className={className}>
				<Button variant="outline">
					Visibility <ChevronDown className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) =>
									column.toggleVisibility(!!value)
								}
							>
								{column.columnDef.meta?.name || column.id}
							</DropdownMenuCheckboxItem>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}