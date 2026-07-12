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
  CreditCard,
  Settings,
  Moon,
  Sun,
  PanelLeftOpen,
  PanelLeftClose,
  PinOff,
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
  { title: "Обзор",         icon: LayoutDashboard },
  { title: "Генерации",     icon: Sparkles },
  { title: "Промты",        icon: FileText },
  { title: "Пользователи",  icon: Users },
  { title: "API ключи",     icon: KeyRound },
  { title: "Тарифы",        icon: CreditCard },
  { title: "Аналитика",     icon: BarChart3 },
]

export type SidebarMode = "hover" | "pinned" | "pinned-collapsed"

type AppSidebarProps = {
  active: string
  onSelect: (title: string) => void
  onModeChange?: (mode: SidebarMode) => void
}

export function AppSidebar({ active, onSelect, onModeChange }: AppSidebarProps) {
  const { setOpen } = useSidebar()
  const [mode, setMode] = React.useState<SidebarMode>("hover")

  const hoverOpenedRef    = React.useRef(false)
  const mouseMoveActiveRef = React.useRef(false)
  const modeRef           = React.useRef<SidebarMode>("hover")

  const OPEN_ZONE  = 71
  const CLOSE_ZONE = 100

  const applyMode = React.useCallback((next: SidebarMode) => {
    modeRef.current = next
    setMode(next)
    onModeChange?.(next)
    if (next === "pinned") {
      hoverOpenedRef.current = false
      mouseMoveActiveRef.current = false
      setOpen(true)
    } else {
      hoverOpenedRef.current = false
      mouseMoveActiveRef.current = false
      setOpen(false)
    }
  }, [setOpen, onModeChange])

  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (modeRef.current !== "hover") return

      if (e.clientX <= OPEN_ZONE) {
        if (!hoverOpenedRef.current) {
          hoverOpenedRef.current = true
          mouseMoveActiveRef.current = false
          setOpen(true)
          setTimeout(() => { mouseMoveActiveRef.current = true }, 70)
        }
      } else if (e.clientX > CLOSE_ZONE) {
        if (hoverOpenedRef.current && mouseMoveActiveRef.current) {
          hoverOpenedRef.current = false
          mouseMoveActiveRef.current = false
          setOpen(false)
        }
      }
    }
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  }, [setOpen])

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
          <SidebarModeButtons mode={mode} onApply={applyMode} />
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

function SidebarModeButtons({ mode, onApply }: { mode: SidebarMode; onApply: (m: SidebarMode) => void }) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const modes: { value: SidebarMode; label: string; icon: React.ElementType }[] = [
    { value: "hover",            label: "С наведением",    icon: PanelLeftOpen  },
    { value: "pinned",           label: "Закреплённая",     icon: PanelLeftClose },
    { value: "pinned-collapsed", label: "Свёрнутая",        icon: PinOff         },
  ]

  if (isCollapsed) {
    const currentIndex = modes.findIndex(m => m.value === mode)
    const next = modes[(currentIndex + 1) % modes.length]
    const CurrentIcon = modes[currentIndex].icon
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={`Режим: ${modes[currentIndex].label}`}
          onClick={() => onApply(next.value)}
        >
          <CurrentIcon />
          <span>Режим панели</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <div className="flex w-full items-center gap-1 rounded-md px-2 py-1">
        <span className="mr-auto truncate text-xs text-sidebar-foreground/60">Панель</span>
        <div className="flex items-center gap-0.5">
          {modes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              title={label}
              onClick={() => onApply(value)}
              className={`flex size-7 items-center justify-center rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                mode === value
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60"
              }`}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>
    </SidebarMenuItem>
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

  React.useEffect(() => { setMounted(true) }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true
  const label  = isDark ? "Светлая тема" : "Тёмная тема"

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
