"use client"

import { User, Bell, ChevronsUpDown, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { getToken, logout, validateToken } from "@/core/utilities/authUtils"
import { useQuery } from "@tanstack/react-query"

const getUserData = async () => {
  try {
    const payload = await validateToken(await getToken())
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

export function NavUser() {
  const { isMobile } = useSidebar()
  const { data } = useQuery({
    queryKey: ["user", "profiles"],
    queryFn: getUserData
  })
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={'/avatar.png'} alt={'avatar'} />
                <AvatarFallback className="rounded-lg">CID</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{data?.name}</span>
                <span className="truncate text-xs">{data?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={'/avatar.png'} alt={'avatar'} />

                  <AvatarFallback className="rounded-lg">CID</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data?.name}</span>
                  <span className="truncate text-xs">{data?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <Bell />
                <Link href="/#">Notifications</Link>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs cursor-pointer" onClick={async () => await logout()}>
              <LogOut />
              <span className="text-sm">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
