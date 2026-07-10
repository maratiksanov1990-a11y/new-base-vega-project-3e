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
  onPinChange?: (pinned: boolean) => void
}

export function AppSidebar({ active, onSelect, onPinChange }: AppSidebarProps) {
  const { state, setOpen } = useSidebar()
  const [pinned, setPinned] = React.useState(false)
  const hoverOpenedRef = React.useRef(false)

  const pinnedRef = React.useRef(pinned)
  React.useEffect(() => { pinnedRef.current = pinned }, [pinned])

  // После открытия ховером даём время анимации завершиться перед проверкой правой половины
  const mouseMoveActiveRef = React.useRef(false)

  const handleMouseEnter = React.useCallback(() => {
    if (pinnedRef.current) return
    hoverOpenedRef.current = true
    mouseMoveActiveRef.current = false
    setOpen(true)
    // Активируем проверку правой половины только после завершения анимации открытия
    setTimeout(() => { mouseMoveActiveRef.current = true }, 150)
  }, [setOpen])

  const handleMouseLeave = React.useCallback(() => {
    if (!pinnedRef.current && hoverOpenedRef.current) {
      hoverOpenedRef.current = false
      mouseMoveActiveRef.current = false
      setOpen(false)
    }
  }, [setOpen])

  // Сворачиваем при заходе курсора на правую половину панели
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (pinnedRef.current || !hoverOpenedRef.current || !mouseMoveActiveRef.current) return
      const sidebarEl = document.querySelector("[data-sidebar='sidebar']") as HTMLElement | null
      if (!sidebarEl) return
      const { left, width } = sidebarEl.getBoundingClientRect()
      const relativeX = e.clientX - left
      if (relativeX > width / 2) {
        hoverOpenedRef.current = false
        mouseMoveActiveRef.current = false
        setOpen(false)
      }
    }
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  }, [setOpen])

  const handlePin = React.useCallback(() => {
    setPinned((prev) => {
      const next = !prev
      onPinChange?.(next)
      if (next) {
        hoverOpenedRef.current = false
        setOpen(true)
      } else {
        setOpen(false)
      }
      return next
    })
  }, [setOpen, onPinChange])

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
        className="flex-1 overflow-hidden truncate text-sm font-semibold text-sidebar-foreground transition-[max-width,opacity] duration-75 ease-linear"
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
