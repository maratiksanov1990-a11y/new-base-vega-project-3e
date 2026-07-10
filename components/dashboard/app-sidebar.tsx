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
  PinOff,
  Check,
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

// Три режима панели
// hover      — свёрнута, раскрывается при наведении (по умолчанию)
// pinned     — закреплена открытой, контент сдвигается
// pinned-collapsed — закреплена свёрнутой (только иконки), контент сдвигается
export type SidebarMode = "hover" | "pinned" | "pinned-collapsed"

type AppSidebarProps = {
  active: string
  onSelect: (title: string) => void
  onModeChange?: (mode: SidebarMode) => void
}

export function AppSidebar({ active, onSelect, onModeChange }: AppSidebarProps) {
  const { setOpen } = useSidebar()
  const [mode, setMode] = React.useState<SidebarMode>("hover")
  const hoverOpenedRef = React.useRef(false)
  const modeRef = React.useRef(mode)
  React.useEffect(() => { modeRef.current = mode }, [mode])

  const mouseMoveActiveRef = React.useRef(false)

  const applyMode = React.useCallback((next: SidebarMode) => {
    setMode(next)
    modeRef.current = next
    onModeChange?.(next)
    if (next === "pinned") {
      hoverOpenedRef.current = false
      mouseMoveActiveRef.current = false
      setOpen(true)
    } else {
      // hover и pinned-collapsed — свёрнуты
      hoverOpenedRef.current = false
      mouseMoveActiveRef.current = false
      setOpen(false)
    }
  }, [setOpen, onModeChange])

  const handleMouseEnter = React.useCallback(() => {
    if (modeRef.current !== "hover") return
    hoverOpenedRef.current = true
    mouseMoveActiveRef.current = false
    setOpen(true)
    setTimeout(() => { mouseMoveActiveRef.current = true }, 70)
  }, [setOpen])

  const handleMouseLeave = React.useCallback(() => {
    if (modeRef.current !== "hover") return
    if (hoverOpenedRef.current) {
      hoverOpenedRef.current = false
      mouseMoveActiveRef.current = false
      setOpen(false)
    }
  }, [setOpen])

  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (modeRef.current !== "hover" || !hoverOpenedRef.current || !mouseMoveActiveRef.current) return
      const sidebarEl = document.querySelector("[data-sidebar='sidebar']") as HTMLElement | null
      if (!sidebarEl) return
      const { left, width } = sidebarEl.getBoundingClientRect()
      if (e.clientX - left > width / 2) {
        hoverOpenedRef.current = false
        mouseMoveActiveRef.current = false
        setOpen(false)
      }
    }
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
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
    { value: "hover", label: "С наведением", icon: PanelLeftOpen },
    { value: "pinned", label: "Закреплённая", icon: PanelLeftClose },
    { value: "pinned-collapsed", label: "Закреп. свёрнутая", icon: PinOff },
  ]

  if (isCollapsed) {
    // В свёрнутом виде — одна кнопка, циклически переключает режим
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
    <>
      {modes.map(({ value, label, icon: Icon }) => (
        <SidebarMenuItem key={value}>
          <SidebarMenuButton
            isActive={mode === value}
            tooltip={label}
            onClick={() => onApply(value)}
          >
            <Icon />
            <span>{label}</span>
            {mode === value && <Check className="ml-auto size-3.5 shrink-0 opacity-60" />}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
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
