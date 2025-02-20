"use client"

import {useConfirm} from "@/components/providers/alert-dialog";
import {useLoading} from "@/components/providers/fullscreen-loading";
import {toast} from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import Link from "next/link";
import {ActionResponse} from "@/core/types/response";
import {createContext, useContext} from "react";
import {QueryKey, useQueryClient} from "@tanstack/react-query";

interface SimpleActionProps {
    detailUrl: string
    editUrl: string
    queryKey?: QueryKey
    onDelete: () => Promise<ActionResponse>
}

const ActionContext = createContext<Partial<SimpleActionProps> | null>(null)

export function ActionWrapper({detailUrl, editUrl, onDelete, children}: Partial<Omit<SimpleActionProps, "queryKey">> & { children: React.ReactNode }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 border">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={"[&>*]:text-xs [&>*[role=menuitem]]:cursor-pointer"}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <ActionContext.Provider value={{detailUrl, editUrl, onDelete}}>
                    {children}
                </ActionContext.Provider>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function useAction() {
    const value = useContext(ActionContext)

    if (!value) {
        throw new Error("useAction must be used within an ActionWrapper")
    }

    return value
}

export function ActionEdit({children}: {children?: React.ReactNode}) {
    const {editUrl = "#"} = useAction()
    return (
        <DropdownMenuItem asChild>
            <Link href={editUrl}>{children ?? "Edit"}</Link>
        </DropdownMenuItem>
    )
}

export function ActionDetail({children}: {children?: React.ReactNode}) {
    const {detailUrl = "#"} = useAction()
    return (
        <DropdownMenuItem asChild>
            <Link href={detailUrl}>{children ?? "Detail"}</Link>
        </DropdownMenuItem>
    )
}

export function ActionDelete({children, queryKey}: { children?: React.ReactNode, queryKey?: QueryKey }) {
    const queryClient = useQueryClient()
    const {onDelete} = useAction()
    const confirm = useConfirm()
    const [, setLoading] = useLoading()

    const handleDelete = async () => {
        if (!onDelete) {
            return
        }

        if (!await confirm({
            title: "Are you sure?",
            body: "This action cannot be undone",
            cancelButton: "Cancel",
            actionButton: "Delete",
        })) {
            return
        }

        setLoading(true)
        try {
            const res = await onDelete()
            if (!res.success) {
                toast.error(`Delete Failed. ${res.error}`)
                return
            }
            if (queryKey) {
                queryClient.invalidateQueries({queryKey})
            }
            toast.success("Delete Success")
        } catch (e: any) {
            toast.error(`Delete Failed. ${e?.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <DropdownMenuItem onClick={handleDelete}>
            {children ?? "Delete"}
        </DropdownMenuItem>
    )
}

export function SimpleAction({queryKey, ...props}:SimpleActionProps){
    return (
        <ActionWrapper {...props}>
            <ActionEdit/>
            <ActionDetail/>
            <ActionDelete queryKey={queryKey}/>
        </ActionWrapper>
    )
}