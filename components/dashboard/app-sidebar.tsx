"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart3,
  Package,
  Settings,
  Moon,
  Sun,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Обзор", icon: LayoutDashboard },
  { title: "Заказы", icon: ShoppingCart },
  { title: "Клиенты", icon: Users },
  { title: "Товары", icon: Package },
  { title: "Аналитика", icon: BarChart3 },
]

type AppSidebarProps = {
  active: string
  onSelect: (title: string) => void
}

export function AppSidebar({ active, onSelect }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-12 group-data-[collapsible=icon]:h-12">
        <div className="relative flex h-full items-center px-1">
          {/* Иконка логотипа + текст + триггер — видны в развёрнутом состоянии */}
          <div className="flex w-full items-center gap-3 transition-opacity duration-200 ease-linear group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="size-5" />
            </span>
            <p className="flex-1 truncate text-sm font-semibold text-sidebar-foreground">Airin</p>
            <SidebarTrigger className="shrink-0" />
          </div>
          {/* Триггер — виден только в свёрнутом состоянии, на месте иконки */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 ease-linear group-data-[collapsible=icon]:pointer-events-auto group-data-[collapsible=icon]:opacity-100 pointer-events-none">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Разделы</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={active === item.title}
                    tooltip={item.title}
                    onClick={() => onSelect(item.title)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Настройки">
              <Settings />
              <span>Настройки</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ThemeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true
  const label = isDark ? "Светлая тема" : "Тёмная тема"

  return (
    <SidebarMenuButton
      tooltip={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
      <span>{label}</span>
    </SidebarMenuButton>
  )
}
