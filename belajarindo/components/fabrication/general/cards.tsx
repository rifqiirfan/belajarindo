"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowUpRight, Maximize, Minimize} from "lucide-react"
import { TooltipBasic } from "../tooltip"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type AppCardProps = {
  classname?: string
  applyHeader?: boolean
  onLeftButton?: {
    description?: string
    actions?: () => void
    element?: React.ReactNode
  }
  onCenterButton?: {
    description?: string
    actions?: () => void
    element?: React.ReactNode
  }
  onRightButton?: {
    description?: string
    actions?: () => void
    element?: React.ReactNode
  }
  children?: React.ReactNode
}

/* Component Style Extensions (CSX) */
export function CsxCardBase({ applyHeader = true, classname = '', children, ...props }: AppCardProps) {
  return (
    <Card>
      {applyHeader && <CardHeader className={cn("flex justify-end items-center gap-2 p-4 py-3 border-b h-8 space-y-0 group", classname)}>
        {props?.onLeftButton?.actions ?
          <TooltipBasic message={props.onLeftButton.description}>
            <div className="sr-only">Left Button</div>
          </TooltipBasic> : (props?.onLeftButton?.element ?? null)
        }
        {props?.onCenterButton?.actions ?
          <TooltipBasic message={props.onCenterButton.description}>
            <div className="sr-only">Center Button</div>
          </TooltipBasic> : (props?.onCenterButton?.element ?? null)
        }
        {props?.onRightButton?.actions ?
          <TooltipBasic message={props.onRightButton.description}>
            <div className="sr-only">Right Button</div>
          </TooltipBasic> : (props?.onRightButton?.element ?? null)
        }
      </CardHeader>}
      <CardContent className="p-4 space-y-3">
        {children}
      </CardContent>
    </Card>
  )
}

export function CsxCardReport({ applyHeader = true, classname = '', children }: AppCardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  return (
    <Card className={`${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "w-full"} transition-all duration-300`}>
      {applyHeader && <CardHeader className={cn("flex justify-end items-center gap-2 p-3 border-b h-9 space-y-0", classname)}>
        <TooltipBasic message={isFullscreen ? "Minimize" : "Maximize"}>
          <Button variant={'outline'} size={'icon'} onClick={toggleFullscreen} className='[&_svg]:size-3.5 border-0 shadow-none w-7 h-7'>
          {isFullscreen ? <Minimize /> : <Maximize />}
          </Button>
        </TooltipBasic>
      </CardHeader>}
      <CardContent className="p-4 space-y-3">
        {children}
      </CardContent>
    </Card>
  )
}