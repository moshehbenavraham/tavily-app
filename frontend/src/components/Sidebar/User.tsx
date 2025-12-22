import { Link as RouterLink } from "@tanstack/react-router"
import { ChevronsUpDown, LogOut, Settings } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth"
import { getInitials } from "@/utils"

interface UserInfoProps {
  fullName?: string
  email?: string
}

function UserInfo({ fullName, email }: UserInfoProps) {
  return (
    <div className="flex items-center gap-3 w-full min-w-0">
      <Avatar className="size-9 ring-2 ring-border/50">
        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
          {getInitials(fullName || "User")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start min-w-0 gap-0.5">
        <p className="text-[14px] font-medium truncate w-full tracking-tight">
          {fullName}
        </p>
        <p className="text-[12px] text-muted-foreground truncate w-full">
          {email}
        </p>
      </div>
    </div>
  )
}

export function User({ user }: { user: any }) {
  const { logout } = useAuth()
  const { isMobile, setOpenMobile } = useSidebar()

  if (!user) return null

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  const handleLogout = async () => {
    logout()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl transition-all duration-200"
              data-testid="user-menu"
            >
              <UserInfo fullName={user?.full_name} email={user?.email} />
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-border/50 shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-3 font-normal border-b border-border/50">
              <UserInfo fullName={user?.full_name} email={user?.email} />
            </DropdownMenuLabel>
            <div className="p-1.5">
              <RouterLink to="/settings" onClick={handleMenuClick}>
                <DropdownMenuItem className="rounded-lg px-3 py-2.5 cursor-pointer">
                  <Settings className="size-4" />
                  <span className="text-[14px]">User Settings</span>
                </DropdownMenuItem>
              </RouterLink>
              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-lg px-3 py-2.5 cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="size-4" />
                <span className="text-[14px]">Log Out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
