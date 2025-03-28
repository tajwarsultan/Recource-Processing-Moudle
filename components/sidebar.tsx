"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, FileText, Users, Settings, Menu, X, Layers, Database } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    {
      label: "Module 1",
      icon: Database,
      children: [
        { href: "/resources", label: "Type A Resources", icon: Package },
        { href: "/jobs", label: "Module 1 Jobs", icon: FileText },
      ],
    },
    {
      label: "Module 2",
      icon: Layers,
      children: [
        { href: "/module2-dashboard", label: "Module 2 Dashboard", icon: LayoutDashboard },
        { href: "/type-b-resources", label: "Type B Resources", icon: Package },
        { href: "/module2-jobs", label: "Module 2 Jobs", icon: FileText },
      ],
    },
    { href: "/users", label: "Users", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      <div
        className={cn(
          "bg-card h-screen border-r transition-all duration-300 flex flex-col",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {!isCollapsed && <div className="font-bold text-xl">ResourceApp</div>}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <Menu /> : <X />}
          </Button>
        </div>

        <div className="flex-1 py-4 overflow-auto">
          <nav className="space-y-1 px-2">
            {navItems.map((item, index) => {
              const Icon = item.icon

              if (item.children) {
                return (
                  <div key={index} className="space-y-1">
                    {!isCollapsed && (
                      <div className="px-3 py-2 text-sm font-medium text-muted-foreground flex items-center gap-3">
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </div>
                    )}

                    {item.children.map((child) => {
                      const ChildIcon = child.icon
                      const isActive = pathname === child.href

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                            isCollapsed ? "justify-center" : "pl-6",
                          )}
                        >
                          <ChildIcon size={20} />
                          {!isCollapsed && <span>{child.label}</span>}
                        </Link>
                      )
                    })}
                  </div>
                )
              }

              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-3 cursor-pointer",
                  isCollapsed ? "justify-center" : "justify-start",
                )}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>OP</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">Operator</p>
                    <p className="text-xs text-muted-foreground truncate">OpsType2</p>
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

