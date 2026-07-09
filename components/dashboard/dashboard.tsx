"use client"

import { useState } from "react"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { ShipmentsTable } from "@/components/dashboard/shipments-table"

export function Dashboard() {
  const [active, setActive] = useState("Обзор")

  return (
    <SidebarProvider>
      <AppSidebar active={active} onSelect={setActive} />
      <SidebarInset className="flex h-svh flex-col overflow-hidden">
        <main className="flex min-h-0 flex-1 flex-col p-6">
          {active === "Заказы" ? <ShipmentsTable /> : <OrdersTable />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
