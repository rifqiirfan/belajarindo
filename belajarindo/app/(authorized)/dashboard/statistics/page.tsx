import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

import { getStatisticDashboard } from "@/core/features/Dashboard/dashboard.service";
import ChartStatistics from "./charts";

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

export default async function Page() {
  const res = await getStatisticDashboard({})
  // const { data, rowCount } = res
  console.log({res})

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
      <div className="grid gap-4">
        <ChartStatistics config={chartConfig} data={chartData} />
      </div>
    </div>

  )
}