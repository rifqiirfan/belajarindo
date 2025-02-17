import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import Image from 'next/image'

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export const metadata = {
  title: 'Dashboard | Belajar Indo',
}

export default function Dashboard() {
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
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-8 p-8">
              <div className="grid auto-rows-min gap-8 md:grid-cols-3">
                <Image
                  src="/beginner_bipa-1_card.png"
                  width={372}
                  height={214}
                  alt="Beginner BIPA 1 Courses"
                />
                <Image
                  src="/beginner_bipa-2_card.png"
                  width={372}
                  height={214}
                  alt="Beginner BIPA 2 Courses"
                />
                <Image
                  src="/intermediate_bipa-3_card.png"
                  width={372}
                  height={214}
                  alt="Intermediate BIPA 3 Courses"
                />
                <Image
                  src="/intermediate_bipa-4_card.png"
                  width={372}
                  height={214}
                  alt="Intermediate BIPA 4 Courses"
                />
                <Image
                  src="/advanced_bipa-5_card.png"
                  width={372}
                  height={214}
                  alt="Advanced BIPA 5 Courses"
                />
                <Image
                  src="/advanced_bipa-6-7_card.png"
                  width={372}
                  height={214}
                  alt="Advanced BIPA 6 and 7 Courses"
                />
              </div>
            </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }