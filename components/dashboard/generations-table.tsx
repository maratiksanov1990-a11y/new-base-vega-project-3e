"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { generations, type GenerationStatus } from "@/lib/ai-admin-data"

const statusConfig: Record<GenerationStatus, { label: string; className: string }> = {
  "Готово":     { label: "Готово",     className: "bg-chart-3/15 text-chart-3 border-transparent"       },
  "В очереди":  { label: "В очереди",  className: "bg-muted text-muted-foreground border-transparent"   },
  "Обработка":  { label: "Обработка",  className: "bg-chart-2/15 text-chart-2 border-transparent"      },
  "Ошибка":     { label: "Ошибка",     className: "bg-destructive/15 text-destructive border-transparent" },
}

export function GenerationsTable() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleAll = () =>
    setSelected(selected.length === generations.length ? [] : generations.map((g) => g.id))
  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <Table containerClassName="flex-1 overflow-auto">
        <TableHeader className="[&_tr]:border-b-0 [&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card [&_th]:shadow-[inset_0_-1px_0_0_var(--border)]">
          <TableRow className="h-14 hover:bg-transparent">
            <TableHead className="w-12 pl-4">
              <Checkbox
                checked={selected.length === generations.length}
                onCheckedChange={toggleAll}
                aria-label="Выбрать все"
              />
            </TableHead>
            <TableHead className="min-w-[90px]">ID</TableHead>
            <TableHead className="min-w-[160px]">Пользователь</TableHead>
            <TableHead className="min-w-[150px]">Промт</TableHead>
            <TableHead className="min-w-[100px]">Провайдер</TableHead>
            <TableHead className="min-w-[80px]">Аккаунт</TableHead>
            <TableHead className="min-w-[110px]">Статус</TableHead>
            <TableHead className="min-w-[90px] text-center">Время, с</TableHead>
            <TableHead className="min-w-[90px] text-right pr-4">Стоимость</TableHead>
            <TableHead className="min-w-[110px]">Дата</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {generations.map((gen) => {
            const status = statusConfig[gen.status]
            const isSelected = selected.includes(gen.id)
            return (
              <TableRow
                key={gen.id}
                className={cn("h-14 cursor-pointer", isSelected && "bg-muted/40")}
                onClick={() => toggle(gen.id)}
              >
                <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={isSelected} onCheckedChange={() => toggle(gen.id)} aria-label={`Выбрать ${gen.id}`} />
                </TableCell>
                <TableCell className="font-medium text-muted-foreground">{gen.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium text-foreground">{gen.userName}</p>
                    <p className="text-xs text-muted-foreground">{gen.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-foreground">{gen.promptTitle}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {gen.provider}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{gen.account}</TableCell>
                <TableCell>
                  <Badge className={cn("text-xs font-medium", status.className)}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">
                  {gen.duration > 0 ? `${gen.duration}` : "—"}
                </TableCell>
                <TableCell className="pr-4 text-right text-sm text-muted-foreground">
                  {gen.cost > 0 ? `₽ ${gen.cost}` : "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{gen.date}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
