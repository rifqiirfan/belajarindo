"use client"

import * as React from "react"
import {
  Book,
  BookOpen,
  BookOpenCheck,
  ChartLine,
  ClipboardList,
  FileCog,
  ListTodo,
  Star,
  Trophy,
  User,
  UserCog,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {getToken, validateToken} from "@/core/utilities/authUtils"
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/components/ui/skeleton";

/* Menus */
const data = {
  navMain: [
    {
      title: "Browse Courses",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Beginner BIPA 1",
          url: "/course/beginner/bipa-1",
        },
        {
          title: "Beginner BIPA 2",
          url: "/course/beginner/bipa-2",
        },
        {
          title: "Intermediate BIPA 3",
          url: "/course/intermediate/bipa-3",
        },
        {
          title: "Intermediate BIPA 4",
          url: "/course/intermediate/bipa-4",
        },
        {
          title: "Advanced BIPA 5",
          url: "/course/advanced/bipa-5",
        },
        {
          title: "Advanced BIPA 6-7",
          url: "/course/advanced/bipa-6",
        },
      ],
    },
  ],
  admin: [
    {
      title: "User",
      url: "/v1/users",
      icon: UserCog,
    },
    {
      title: "Course",
      url: "/v1/courses",
      icon: Book,
    },
    {
      title: "Lesson",
      url: "/v1/lessons",
      icon: BookOpenCheck,
    },
    {
      title: "Quiz",
      url: "/v1/quizzes",
      icon: ClipboardList,
    },
    {
      title: "Achievement",
      url: "/v1/achievements",
      icon: Trophy,
    },
  ],
  profile: [
    {
      title: "Progress",
      url: "/dashboard/progress",
      icon: ListTodo,
    },
    {
      title: "Achievement",
      url: "/dashboard/achievement",
      icon: Star,
    },
    {
      title: "Statistics",
      url: "/dashboard/statistics",
      icon: ChartLine,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ],
  adminProfile: [
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ],
}

const getUserData = async () => {
  try {
    const payload = await validateToken(await getToken())
    console.log(payload)
    return {
      id: payload.userId,
      name: payload.full_name,
      username: payload.username,
      email: payload.email,
      role: payload.role
    }
  } catch (e: any) {
    console.info(e)
    return {}
  }
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const {data: userData, isPending} = useQuery({
    queryKey: ["user", "profiles"],
    queryFn: getUserData
  })

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <NavUser/>
      </SidebarHeader>
      <SidebarContent>
        {!isPending ?
          <>
            {userData?.role === "USER" && <NavMain label="Course" items={data.navMain}/>}
            {userData?.role === "USER" && <NavMain label="Users" items={data.profile}/>}
            {userData?.role === "ADMIN" && <NavMain label="Admin" items={data.admin}/>}
            {userData?.role === "ADMIN" && <NavMain label="Admin" items={data.adminProfile}/>}
          </>
          :
          <div className={"p-2 space-y-1"}>
            <Skeleton className={"w-full h-8 rounded-sm"}/>
            <Skeleton className={"w-full h-8 rounded-sm"}/>
            <Skeleton className={"w-full h-8 rounded-sm"}/>
            <Skeleton className={"w-full h-8 rounded-sm"}/>
            <Skeleton className={"w-full h-8 rounded-sm"}/>
            <Skeleton className={"w-full h-8 rounded-sm"}/>
          </div>
        }

        {/* <NavAdmin admin={data.admin} />
        <NavProfile profile={data.profile} /> */}
      </SidebarContent>
      <SidebarRail/>
    </Sidebar>
  )
}
