import { Dialog as ShadcnDialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Maximize2, Minimize2, X } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { TooltipBasic } from "../tooltip"
import { Button } from "@/components/ui/button"
import { DialogDescription } from "@radix-ui/react-dialog"

type CustomDialogProps = {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  trigger?: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  className?: string
  title?: string
}

export function CsxModalBase({ open, setOpen, trigger, children, className, title = "Untitled" }: CustomDialogProps) {
  const [state, setState] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  return (
    <ShadcnDialog open={open ?? state} onOpenChange={setOpen ?? setState}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("p-0 border-0 shadow-2xl rounded-lg overflow-hidden bg-slate-50 focus:outline-none",
        isFullscreen ? "w-screen h-screen max-w-none animate-in fade-in duration-300" : "w-[500px] max-h-[85vh]", className)}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        withClose={false}
      >
        <div className={cn("flex flex-col", isFullscreen ? "h-screen" : "h-full")}>
          <div className="flex items-center justify-between p-3 border-b">
            <DialogTitle>
              <span className="text-sm text-zinc-700">{title}</span>
            </DialogTitle>
            <DialogDescription className="sr-only">{title}</DialogDescription>
            <div className="flex gap-2">
              <TooltipBasic message={'Expand Modal'}>
                <Button onClick={toggleFullscreen} size={'icon'} variant={'link'}>
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </TooltipBasic>
              <TooltipBasic message={'Close Modal'}>
                <DialogClose className="opacity-90 transition-opacity hover:opacity-100">
                  <Button size={'icon'} variant={'link'} className="text-red-500">
                    <X className="w-4 h-4" />
                  </Button>
                  <span className="sr-only">Close</span>
                </DialogClose>
              </TooltipBasic>
            </div>
          </div>
          <div className="flex-grow overflow-auto p-4">{children}</div>
        </div>
      </DialogContent>
    </ShadcnDialog>
  )
}