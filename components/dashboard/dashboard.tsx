"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { ShipmentsTable } from "@/components/dashboard/shipments-table"

function FloatingSidebarTrigger() {
  const { state, width, isMobile } = useSidebar()
  const sidebarW = state === "expanded" ? `var(--sidebar-width)` : `var(--sidebar-width-icon)`

  if (isMobile) return null

  return (
    <div
      className="fixed top-[calc(50%-16px)] z-20 transition-[left] duration-150 ease-linear"
      style={{ left: `calc(${sidebarW} - 12px)` }}
    >
      <SidebarTrigger className="flex h-8 w-6 items-center justify-center rounded-md border border-border bg-background shadow-sm hover:bg-accent" />
    </div>
  )
}

export function Dashboard() {
  const [active, setActive] = useState("Обзор")

  const isOrders = active === "Заказы"
  const buttonLabel = isOrders ? "Новая доставка" : "Новый заказ"
  const searchPlaceholder = isOrders ? "Поиск доставок…" : "Поиск заказов…"

  return (
    <SidebarProvider>
      <AppSidebar active={active} onSelect={setActive} />
      <FloatingSidebarTrigger />
      <SidebarInset className="flex h-svh flex-col overflow-hidden">
        <header className="flex h-12 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-6">
          <Button size="sm" className="h-8">
            <Plus className="size-4" />
            {buttonLabel}
          </Button>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="h-8 pl-9"
              aria-label={searchPlaceholder}
            />
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col p-6">
          {isOrders ? <ShipmentsTable /> : <OrdersTable />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
