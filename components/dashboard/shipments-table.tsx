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
import { Checkbox } from "@/components/ui/checkbox"

import { cn } from "@/lib/utils"
import { shipments, type ShipmentStatus } from "@/lib/dashboard-data"

const statusStyles: Record<ShipmentStatus, string> = {
  Доставлено: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  "В пути": "bg-chart-2/15 text-chart-2 border-chart-2/20",
  Ожидает: "bg-chart-4/15 text-chart-4 border-chart-4/20",
  Возврат: "bg-destructive/15 text-destructive border-destructive/20",
}

export function ShipmentsTable() {
  const [selected, setSelected] = useState<string[]>([])

  const allSelected = selected.length === shipments.length && shipments.length > 0
  const toggleAll = (checked: boolean) =>
    setSelected(checked ? shipments.map((shipment) => shipment.id) : [])
  const toggleRow = (id: string, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    )

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card">
            <TableRow className="h-14 hover:bg-transparent">
              <TableHead className="w-12 pl-4">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => toggleAll(checked === true)}
                  aria-label="Выбрать все доставки"
                />
              </TableHead>
              <TableHead>Трек-номер</TableHead>
              <TableHead>Заказ</TableHead>
              <TableHead>Курьер</TableHead>
              <TableHead>Город</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="pr-4 text-right">Доставка</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id} className="h-14" data-state={selected.includes(shipment.id) ? "selected" : undefined}>
                <TableCell className="pl-4">
                  <Checkbox
                    checked={selected.includes(shipment.id)}
                    onCheckedChange={(checked) => toggleRow(shipment.id, checked === true)}
                    aria-label={`Выбрать доставку ${shipment.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">{shipment.id}</TableCell>
                <TableCell className="text-muted-foreground">{shipment.orderId}</TableCell>
                <TableCell className="text-foreground">{shipment.courier}</TableCell>
                <TableCell className="text-foreground">{shipment.city}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("font-medium", statusStyles[shipment.status])}>
                    {shipment.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-4 text-right text-muted-foreground">
                  {new Date(shipment.eta).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "short",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
