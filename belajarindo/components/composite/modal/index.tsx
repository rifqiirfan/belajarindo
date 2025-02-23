import { Dialog as ShadcnDialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Maximize2, Minimize2, X } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
              <Button onClick={toggleFullscreen} size={'icon'} variant={'link'} className="text-slate-400 size-6">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button size={'icon'} variant={'link'} className="text-red-500 size-6 hover:bg-slate-200" asChild>
                <DialogClose className="opacity-90 transition-opacity hover:opacity-100">
                  <X className="w-4 h-4" />
                </DialogClose>
              </Button>
            </div>
          </div>
          <div className="flex-grow overflow-auto p-4">{children}</div>
        </div>
      </DialogContent>
    </ShadcnDialog >
  )
}

export function CsxModalAchievement({ open, setOpen, data }: { open?: boolean, setOpen?: Dispatch<SetStateAction<boolean>>, data: any }) {
  const [state, setState] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <ShadcnDialog open={open ?? state} onOpenChange={setOpen ?? setState}>
      <DialogContent className={cn("p-0 border-0 shadow-2xl rounded-lg overflow-hidden bg-slate-50 focus:outline-none",
        isFullscreen ? "w-screen h-screen max-w-none animate-in fade-in duration-300" : "w-[500px] max-h-[85vh]")}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        withClose={false}
      >
        <div className={cn("flex flex-col", isFullscreen ? "h-screen" : "h-full")}>
          <div className="flex-grow overflow-auto p-4">
            {data?.map((d: any, index: Number) => {
              <div className="flex flex-col items-center space-y-2 p-0">
                {d?.icon_url && (
                  <Avatar className="p-2">
                    <AvatarImage src={d?.icon_url} alt="@shadcn" />
                    <AvatarFallback>TROPY</AvatarFallback>
                  </Avatar>
                )}
                <span className="text-sm font-medium text-center">{d.achievement_name}</span>
              </div>
            })}
          </div>
          <Button variant={'link'} className="hover:bg-slate-200" asChild>
            <DialogClose className="opacity-90 transition-opacity hover:opacity-100">
              Close
            </DialogClose>
          </Button>
        </div>
      </DialogContent>
    </ShadcnDialog >
  )
}