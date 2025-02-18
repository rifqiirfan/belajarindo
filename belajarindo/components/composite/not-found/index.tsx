import { SearchX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { Muted, Small } from "@/components/typography";

export function NotFoundItems() {
  return (
    <Card className={"h-96 min-h-full"}>
      <CardContent className={"h-full flex flex-col gap-2 items-center justify-center"}>
        <SearchX className={"w-8 h-8 text-foreground"} />
        <div className="text-sm">Item Not Found</div>
        <div className="text-xs text-muted">Try refreshing the page, or go back</div>
      </CardContent>
    </Card>
  )
}

export function NotFoundPage() {
  return (
    <Card className={"h-full"}>
      <CardContent className={"h-full flex items-center justify-center"}>
        <div className="text-xs">404 Page Not Found</div>
      </CardContent>
    </Card>
  )
}