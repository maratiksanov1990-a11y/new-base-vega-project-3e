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
  const { state, open, setOpen } = useSidebar()
  const hoverOpenedRef = React.useRef(false)

  const handleMouseEnter = React.useCallback(() => {
    if (state === "collapsed") {
      hoverOpenedRef.current = true
      setOpen(true)
    }
  }, [state, setOpen])

  const handleMouseLeave = React.useCallback(() => {
    if (hoverOpenedRef.current) {
      hoverOpenedRef.current = false
      setOpen(false)
    }
  }, [setOpen])

  return (
    <Sidebar collapsible="icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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

  // Задержка появления триггера совпадает с анимацией ширины (100ms)
  const [showTrigger, setShowTrigger] = React.useState(false)

  React.useEffect(() => {
    if (isCollapsed) {
      const t = setTimeout(() => setShowTrigger(true), 50)
      return () => clearTimeout(t)
    } else {
      setShowTrigger(false)
    }
  }, [isCollapsed])

  return (
    <div className="relative flex items-center gap-2">
      {/* Иконка логотипа */}
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity duration-100 ease-linear"
        style={{ opacity: isCollapsed ? 0 : 1 }}
      >
        <LayoutDashboard className="size-5" />
      </span>
      {/* Триггер поверх иконки — плавно появляется после начала анимации */}
      <div
        className="absolute left-0 flex size-9 items-center justify-center transition-opacity duration-100 ease-linear"
        style={{ opacity: showTrigger ? 1 : 0 }}
      >
        <SidebarTrigger />
      </div>
      {/* Текст Airin + триггер закрытия */}
      <p
        className="flex-1 overflow-hidden truncate text-sm font-semibold text-sidebar-foreground transition-[max-width,opacity] duration-100 ease-linear"
        style={{ opacity: isCollapsed ? 0 : 1, maxWidth: isCollapsed ? 0 : undefined }}
      >
        Airin
      </p>
      <SidebarTrigger
        className="shrink-0 transition-opacity duration-100 ease-linear"
        style={{ opacity: isCollapsed ? 0 : 1, pointerEvents: isCollapsed ? "none" : undefined }}
      />
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
