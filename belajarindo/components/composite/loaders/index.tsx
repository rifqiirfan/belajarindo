import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function LoaderCircle() {
  return (
    <Loader2 className="w-10 h-10 animate-spin" />
  )
}

export function LoaderCard() {
  return (
    <Card className={"h-full"}>
      <CardContent className={"h-full flex items-center justify-center"}>
        <LoaderCircle />
      </CardContent>
    </Card>
  )
}

export function LoaderFull() {
  return (
    <div className={"h-full w-full flex items-center justify-center"}>
      <LoaderCircle />
    </div>
  )
}