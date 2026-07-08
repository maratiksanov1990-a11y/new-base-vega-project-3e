"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"
import { shipments, type ShipmentStatus } from "@/lib/dashboard-data"

const statusStyles: Record<ShipmentStatus, string> = {
  Доставлено: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  "В пути": "bg-chart-2/15 text-chart-2 border-chart-2/20",
  Ожидает: "bg-chart-4/15 text-chart-4 border-chart-4/20",
  Возврат: "bg-destructive/15 text-destructive border-destructive/20",
}

export function ShipmentsTable() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Трек-номер</TableHead>
              <TableHead>Заказ</TableHead>
              <TableHead>Курьер</TableHead>
              <TableHead>Город</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Доставка</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium text-foreground">{shipment.id}</TableCell>
                <TableCell className="text-muted-foreground">{shipment.orderId}</TableCell>
                <TableCell className="text-foreground">{shipment.courier}</TableCell>
                <TableCell className="text-foreground">{shipment.city}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("font-medium", statusStyles[shipment.status])}>
                    {shipment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
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
