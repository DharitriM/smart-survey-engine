"use client"

import { useState } from "react"
import { Bell, Search, User, Settings, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ProfileModal } from "@/components/profile/profile-modal"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useAuth } from "@/lib/hooks/use-auth"
import { toggleSidebar } from "@/lib/store/slices/ui-slice"

export function Header() {
  const dispatch = useAppDispatch()
  const currentView = useAppSelector((state) => state.ui.currentView)
  const { user, logout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)

  const getPageTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Dashboard"
      case "builder":
        return "Survey Builder"
      case "preview":
        return "Preview"
      case "take-survey":
        return "Take Survey"
      case "analytics":
        return "Analytics"
      default:
        return "Smart Survey Engine"
    }
  }

  return (
    <>
      <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => dispatch(toggleSidebar())} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <h1 className="text-2xl font-bold text-foreground">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search surveys..." className="pl-10 w-64" />
            </div>

            <ThemeToggle />

            {/* <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  )
}
