import { AppSidebar } from "@/components/app-sidebar";
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
import { CircleX } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const metadata = {
  title: 'Achievement | Belajar Indo',
}

export default function AchievementPage() {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Achievement</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-8 p-8">
            <div className="grid auto-rows-min gap-8 md:grid-cols-3">
              <Card className="bg-green-400">
                <CardHeader>
                  <CardTitle>Beginner</CardTitle>
                  <CardDescription>BIPA 1 and BIPA 2</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">1</p>
                  <p className="text-green-950">Enrolled course</p>
                </CardContent>
                <CardContent>
                  <p>Progress: <Progress value={10} /></p>
                </CardContent>
                <CardFooter>
                  <p>Achievement: <CircleX /></p>
                </CardFooter>
              </Card>
              <Card className="bg-cyan-400">
                <CardHeader>
                  <CardTitle>Intermediate</CardTitle>
                  <CardDescription>BIPA 3 and BIPA 4</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">0</p>
                  <p className="text-cyan-950">Enrolled course</p>
                </CardContent>
                <CardContent>
                  <p>Progress: <Progress value={0} /></p>
                </CardContent>
                <CardFooter>
                  <p>Achievement: <CircleX /></p>
                </CardFooter>
              </Card>
              <Card className="bg-pink-400">
                <CardHeader>
                  <CardTitle>Advanced</CardTitle>
                  <CardDescription>BIPA 5, BIPA 6, and BIPA 7</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">0</p>
                  <p className="text-pink-950">Enrolled course</p>
                </CardContent>
                <CardContent>
                  <p>Progress: <Progress value={0} /></p>
                </CardContent>
                <CardFooter>
                  <p>Achievement: <CircleX /></p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }