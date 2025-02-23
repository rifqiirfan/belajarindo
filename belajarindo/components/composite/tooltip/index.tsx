import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipBasic({ children, message }: { children: React.ReactNode, message: React.ReactNode | string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {typeof message == 'string' ? <p>{message}</p> : message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}