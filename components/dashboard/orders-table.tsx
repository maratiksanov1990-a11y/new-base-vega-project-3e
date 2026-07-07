"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { currency, orders, type OrderStatus } from "@/lib/dashboard-data"

const statusStyles: Record<OrderStatus, string> = {
  Оплачен: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  "В обработке": "bg-chart-4/15 text-chart-4 border-chart-4/20",
  Отправлен: "bg-chart-2/15 text-chart-2 border-chart-2/20",
  Отменён: "bg-destructive/15 text-destructive border-destructive/20",
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

export function OrdersTable() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<string>("all")

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesQuery =
        order.customer.toLowerCase().includes(query.toLowerCase()) ||
        order.id.toLowerCase().includes(query.toLowerCase()) ||
        order.email.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === "all" || order.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  return (
    <Card className="border-border/60">
      <CardHeader className="gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <CardTitle>Последние заказы</CardTitle>
          <CardDescription>{filtered.length} из {orders.length} заказов</CardDescription>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по клиенту или номеру…"
              className="w-full pl-9 sm:w-64"
              aria-label="Поиск заказов"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-40" aria-label="Фильтр по статусу">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="Оплачен">Оплачен</SelectItem>
              <SelectItem value="В обработке">В обработке</SelectItem>
              <SelectItem value="Отправлен">Отправлен</SelectItem>
              <SelectItem value="Отменён">Отменён</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Заказ</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-accent text-xs font-medium text-accent-foreground">
                          {initials(order.customer)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="leading-tight">
                        <p className="font-medium text-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-medium", statusStyles[order.status])}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums text-foreground">
                    {currency(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    Заказы не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
