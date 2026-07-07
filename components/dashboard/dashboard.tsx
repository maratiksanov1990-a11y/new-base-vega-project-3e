import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
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

        <main className="flex flex-1 flex-col p-6">
          <OrdersTable />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
