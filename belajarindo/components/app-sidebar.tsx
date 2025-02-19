"use client"

import * as React from "react"
import {
  BookOpen,
  ChartLine,
  FileCog,
  ListTodo,
  Star,
  User,
  UserCog,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
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
          url: "/course/bipa-1",
        },
        {
          title: "Beginner BIPA 2",
          url: "/course/bipa-2",
        },
        {
          title: "Intermediate BIPA 3",
          url: "/course/bipa-3",
        },
        {
          title: "Intermediate BIPA 4",
          url: "/course/bipa-4",
        },
        {
          title: "Advanced BIPA 5",
          url: "/course/bipa-5",
        },
        {
          title: "Advanced BIPA 6-7",
          url: "/course/bipa-6-7",
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
      icon: FileCog,
    },
    {
      title: "Lesson",
      url: "/v1/lessons",
      icon: FileCog,
    },
    {
      title: "Quiz",
      url: "/v1/quizzes",
      icon: FileCog,
    },
    {
      title: "Achievement",
      url: "/v1/achievements",
      icon: FileCog,
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Course" items={data.navMain} />
        <NavMain label="Admin" items={data.admin} />
        <NavMain label="Users" items={data.profile} />

        {/* <NavAdmin admin={data.admin} />
        <NavProfile profile={data.profile} /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
