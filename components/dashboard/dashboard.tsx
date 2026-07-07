import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { StatCards } from "@/components/dashboard/stat-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { OrdersTable } from "@/components/dashboard/orders-table"

export function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background px-4 py-3 shadow-sm sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <p className="text-sm font-semibold text-foreground">Аналитика</p>
          </div>
          <Button>
            <Plus className="size-4" />
            Новый заказ
          </Button>
        </header>

        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-balance text-foreground">
              Обзор за июль
            </h1>
            <p className="text-sm text-muted-foreground">
              Ключевые показатели, динамика продаж и свежие заказы вашего магазина.
            </p>
          </div>

          <StatCards />

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-5">
              <RevenueChart />
            </div>
          </div>

          <OrdersTable />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
