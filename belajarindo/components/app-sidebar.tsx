"use client"

import * as React from "react"
import {
  BookOpen,
  ChartLine,
  FileCog,
  Star,
  Pickaxe,
  User,
  UserCog,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProfile } from "@/components/nav-profile"
import { NavAdmin } from "@/components/nav-admin"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john.doe@aol.com",
    avatar: "/avatar.png",
  },
  navMain: [
    {
      title: "Browse Courses",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Beginner BIPA 1",
          url: "/course/beginner",
        },
        {
          title: "Beginner BIPA 2",
          url: "/course/beginner",
        },
        {
          title: "Intermediate BIPA 3",
          url: "/course/intermediate",
        },
        {
          title: "Intermediate BIPA 4",
          url: "/course/intermediate",
        },
        {
          title: "Advancced BIPA 5",
          url: "/course/advanced",
        },
        {
          title: "Advancced BIPA 6-7",
          url: "/course/advanced",
        },
      ],
    },
  ],
  admin: [
    {
      name: "User Management",
      url: "/admin/user-management",
      icon: UserCog,
    },
    {
      name: "Course Management",
      url: "/admin/course-management",
      icon: FileCog,
    },
  ],
  profile: [
    {
      name: "Progress",
      url: "/dashboard/progress",
      icon: Pickaxe,
    },
    {
      name: "Achievement",
      url: "/dashboard/achievement",
      icon: Star,
    },
    {
      name: "Statistics",
      url: "/dashboard/statistics",
      icon: ChartLine,
    },
    {
      name: "Profile",
      url: "/profile",
      icon: User,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAdmin admin={data.admin} />
        <NavProfile profile={data.profile} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
