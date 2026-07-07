import { LayoutDashboard, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCards } from "@/components/dashboard/stat-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { OrdersTable } from "@/components/dashboard/orders-table"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background [transform:translateZ(0)] [will-change:transform]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">Аналитика</p>
              <p className="text-xs text-muted-foreground">Панель управления</p>
            </div>
          </div>
          <Button>
            <Plus className="size-4" />
            Новый заказ
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
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
    </div>
  )
}
