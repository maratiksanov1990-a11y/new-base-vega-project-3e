"use client"

import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"

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
  const [selected, setSelected] = useState<string[]>([])

  const allSelected = selected.length === orders.length && orders.length > 0
  const toggleAll = (checked: boolean) =>
    setSelected(checked ? orders.map((order) => order.id) : [])
  const toggleRow = (id: string, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    )

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <Table containerClassName="flex-1 overflow-auto">
            <TableHeader className="[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card">
              <TableRow className="h-14 hover:bg-transparent">
                <TableHead className="w-12 pl-4">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(checked) => toggleAll(checked === true)}
                    aria-label="Выбрать все заказы"
                  />
                </TableHead>
                <TableHead>Заказ</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="pr-4 text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="h-14" data-state={selected.includes(order.id) ? "selected" : undefined}>
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={selected.includes(order.id)}
                      onCheckedChange={(checked) => toggleRow(order.id, checked === true)}
                      aria-label={`Выбрать заказ ${order.id}`}
                    />
                  </TableCell>
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
                  <TableCell className="pr-4 text-right font-medium tabular-nums text-foreground">
                    {currency(order.amount)}
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
        </Table>
    </div>
  )
}
