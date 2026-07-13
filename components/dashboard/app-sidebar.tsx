"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  LayoutDashboard,
  Sparkles,
  Users,
  BarChart3,
  FileText,
  KeyRound,
  BrainCircuit,
  CreditCard,
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

const mainNavItems = [
  { title: "Обзор",        icon: LayoutDashboard },
  { title: "Генерации",    icon: Sparkles },
  { title: "Промты",       icon: FileText },
  { title: "Пользователи", icon: Users },
  { title: "Тарифы",       icon: CreditCard },
  { title: "Аналитика",    icon: BarChart3 },
]

const aiProviderItems = [
  { title: "API ключи",  icon: KeyRound },
  { title: "AI модели",  icon: BrainCircuit },
]

export type SidebarMode = "hover" | "pinned"

type AppSidebarProps = {
  active: string
  onSelect: (title: string) => void
  onModeChange?: (mode: SidebarMode) => void
}

export function AppSidebar({ active, onSelect, onModeChange }: AppSidebarProps) {
  const { state, setOpen } = useSidebar()
  const [pinned, setPinned] = React.useState(false)
  const hoverOpenedRef = React.useRef(false)

  const pinnedRef = React.useRef(pinned)
  React.useEffect(() => { pinnedRef.current = pinned }, [pinned])

  // После открытия ховером даём время анимации завершиться перед проверкой правой половины
  const mouseMoveActiveRef = React.useRef(false)

  const OPEN_ZONE  = 71  // px — открывать при входе курсора в эту зону
  const CLOSE_ZONE = 100 // px — закрывать когда курсор уходит правее этой зоны
  // Задержка должна быть больше длительности анимации сайдбара (35ms),
  // иначе два setState сливаются в один рендер и анимация пропускается
  const OPEN_SETTLE_MS = 80

  // Вся логика открытия/закрытия через document mousemove
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (pinnedRef.current) return

      if (e.clientX <= OPEN_ZONE) {
        // Курсор в зоне открытия
        if (!hoverOpenedRef.current) {
          hoverOpenedRef.current = true
          mouseMoveActiveRef.current = false
          setOpen(true)
          // Ждём завершения анимации открытия прежде чем разрешить закрытие
          setTimeout(() => { mouseMoveActiveRef.current = true }, OPEN_SETTLE_MS)
        }
      } else if (e.clientX > CLOSE_ZONE) {
        // Курсор вышел за зону закрытия
        if (hoverOpenedRef.current && mouseMoveActiveRef.current) {
          hoverOpenedRef.current = false
          mouseMoveActiveRef.current = false
          setOpen(false)
        }
      }
      // Между OPEN_ZONE и CLOSE_ZONE — ничего не делаем (гистерезис)
    }
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  }, [setOpen])

  const handlePin = React.useCallback(() => {
    const next = !pinnedRef.current
    setPinned(next)
    onModeChange?.(next ? "pinned" : "hover")
    hoverOpenedRef.current = false
    mouseMoveActiveRef.current = false
    // Небольшой defer чтобы state обновился до вызова setOpen
    setTimeout(() => setOpen(next), 0)
  }, [setOpen, onModeChange])

  return (
    <Sidebar collapsible="icon" className="z-20">
      <SidebarHeader className="h-12">
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Разделы</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
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
        <SidebarGroup>
          <SidebarGroupLabel>AI поставщики</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiProviderItems.map((item) => (
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
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[min(var(--radius-md),10px)] bg-primary text-primary-foreground">
        <LayoutDashboard className="size-4" />
      </span>
      <p
        className="flex-1 overflow-hidden truncate text-sm font-semibold text-sidebar-foreground transition-[max-width,opacity] duration-[35ms] ease-out"
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
