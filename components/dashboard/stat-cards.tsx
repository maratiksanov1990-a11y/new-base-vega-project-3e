import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { stats } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const isUp = stat.trend === "up"
        return (
          <Card key={stat.label} className="border-border/60">
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <div className="flex items-end justify-between gap-2">
                <span className="text-3xl font-semibold tracking-tight text-foreground">{stat.value}</span>
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                    isUp ? "bg-chart-3/15 text-chart-3" : "bg-destructive/15 text-destructive",
                  )}
                >
                  {isUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{stat.hint}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
