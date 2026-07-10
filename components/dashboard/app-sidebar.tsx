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
  PanelLeftClose,
  PanelLeftOpen,
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
  useSidebar,
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
  const { state, setOpen } = useSidebar()
  const [pinned, setPinned] = React.useState(false)
  const hoverOpenedRef = React.useRef(false)

  const handleMouseEnter = React.useCallback(() => {
    if (!pinned && state === "collapsed") {
      hoverOpenedRef.current = true
      setOpen(true)
    }
  }, [pinned, state, setOpen])

  const handleMouseLeave = React.useCallback(() => {
    if (!pinned && hoverOpenedRef.current) {
      hoverOpenedRef.current = false
      setOpen(false)
    }
  }, [pinned, setOpen])

  const handlePin = React.useCallback(() => {
    setPinned((prev) => {
      const next = !prev
      if (next) {
        // Фиксируем — оставляем открытым
        hoverOpenedRef.current = false
        setOpen(true)
      } else {
        // Отфиксируем — сворачиваем
        setOpen(false)
      }
      return next
    })
  }, [setOpen])

  return (
    <Sidebar collapsible="icon" className="z-20" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SidebarHeader className="h-12">
        <SidebarHeaderContent />
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
            <SidebarMenuButton
              tooltip={pinned ? "Открепить панель" : "Закрепить панель"}
              onClick={handlePin}
            >
              {pinned ? <PanelLeftClose /> : <PanelLeftOpen />}
              <span>{pinned ? "Открепить панель" : "Закрепить панель"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
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

function SidebarHeaderContent() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div className="flex items-center gap-2">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <LayoutDashboard className="size-4" />
      </span>
      <p
        className="flex-1 overflow-hidden truncate text-sm font-semibold text-sidebar-foreground transition-[max-width,opacity] duration-100 ease-linear"
        style={{ opacity: isCollapsed ? 0 : 1, maxWidth: isCollapsed ? 0 : undefined }}
      >
        Airin
      </p>
    </div>
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
