"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const chartData = [
  { month: "January", desktop: 0, achievement: 0 },
  { month: "February", desktop: 100, achievement: 0 },
  { month: "March", desktop: 0, achievement: 0 },
  { month: "April", desktop: 0, achievement: 0 },
  { month: "May", desktop: 0, achievement: 0 },
  { month: "June", desktop: 0, achievement: 0 },
]

const chartConfig = {
  desktop: {
    label: "Points",
    color: "hsl(var(--chart-1))",
  },
  achievement: {
    label: "Achievements",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function StatisticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      {/* <div className="grid auto-rows-min gap-8 md:grid-cols-3">
        <Card className="bg-green-400">
          <CardHeader>
            <CardTitle>Beginner</CardTitle>
            <CardDescription className="text-green-950">BIPA 1 and BIPA 2</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">1</p>
            <p className="text-green-950">Enrolled lesson(s)</p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2">
              <span>Updated on 18 February 2025</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-cyan-400">
          <CardHeader>
            <CardTitle>Intermediate</CardTitle>
            <CardDescription className="text-cyan-950">BIPA 3 and BIPA 4</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">0</p>
            <p className="text-cyan-950">Enrolled lesson(s)</p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2">
              <span>Updated on 18 February 2025</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-pink-400">
          <CardHeader>
            <CardTitle>Advanced</CardTitle>
            <CardDescription className="text-pink-950">BIPA 5, BIPA 6, and BIPA 7</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">0</p>
            <p className="text-pink-950">Enrolled lesson(s)</p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2">
              <span>Updated on 18 February 2025</span>
            </div>
          </CardFooter>
        </Card>
      </div> */}
      <div className="grid auto-rows-min gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Points collected</CardTitle>
            <CardDescription>January - June 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                  <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">Showing points collected by the user for the last 6 months</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Achievement received</CardTitle>
            <CardDescription>January - June 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="achievement" fill="var(--color-desktop)" radius={8}>
                  <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">Showing achievement received by the user for the last 6 months</div>
          </CardFooter>
        </Card>
      </div>
    </div>

  )
}