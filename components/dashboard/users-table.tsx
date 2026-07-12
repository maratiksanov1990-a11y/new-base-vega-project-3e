"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { appUsers, type UserStatus, type UserSource } from "@/lib/ai-admin-data"

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  "Активен":      { label: "Активен",      className: "bg-chart-3/15 text-chart-3 border-transparent"         },
  "Неактивен":    { label: "Неактивен",    className: "bg-muted text-muted-foreground border-transparent"     },
  "Заблокирован": { label: "Заблокирован", className: "bg-destructive/15 text-destructive border-transparent" },
}

const sourceConfig: Record<UserSource, string> = {
  "ВКонтакте": "bg-chart-1/15 text-chart-1 border-transparent",
  "MAX":        "bg-chart-4/15 text-chart-4 border-transparent",
  "Прямой":     "bg-muted text-muted-foreground border-transparent",
  "Telegram":   "bg-chart-2/15 text-chart-2 border-transparent",
}

export function UsersTable() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleAll = () =>
    setSelected(selected.length === appUsers.length ? [] : appUsers.map((u) => u.id))
  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  return (
    <div className="flex min-h-0 max-h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <Table containerClassName="overflow-auto">
        <TableHeader className="[&_tr]:border-b-0 [&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card [&_th]:shadow-[inset_0_-1px_0_0_var(--border)]">
          <TableRow className="h-14 hover:bg-transparent">
            <TableHead className="w-12 pl-4">
              <Checkbox checked={selected.length === appUsers.length} onCheckedChange={toggleAll} aria-label="Выбрать все" />
            </TableHead>
            <TableHead className="min-w-[80px]">ID</TableHead>
            <TableHead className="min-w-[180px]">Пользователь</TableHead>
            <TableHead className="min-w-[130px]">Телефон</TableHead>
            <TableHead className="min-w-[110px]">Источник</TableHead>
            <TableHead className="min-w-[110px]">Статус</TableHead>
            <TableHead className="min-w-[90px] text-center">Бесплатная</TableHead>
            <TableHead className="min-w-[100px] text-center">Генераций</TableHead>
            <TableHead className="min-w-[90px] text-center">Остаток</TableHead>
            <TableHead className="min-w-[110px] text-right pr-4">Потрачено</TableHead>
            <TableHead className="min-w-[110px]">Регистрация</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appUsers.map((user) => {
            const status = statusConfig[user.status]
            const isSelected = selected.includes(user.id)
            return (
              <TableRow key={user.id} className={cn("h-14 cursor-pointer", isSelected && "bg-muted/40")} onClick={() => toggle(user.id)}>
                <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={isSelected} onCheckedChange={() => toggle(user.id)} aria-label={`Выбрать ${user.id}`} />
                </TableCell>
                <TableCell className="font-medium text-muted-foreground">{user.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.phone}</TableCell>
                <TableCell>
                  <Badge className={cn("text-xs", sourceConfig[user.source])}>{user.source}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("text-xs font-medium", status.className)}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">
                  {user.freeUsed ? "Использована" : "Доступна"}
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{user.generationsTotal}</TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">{user.generationsLeft}</TableCell>
                <TableCell className="pr-4 text-right text-sm text-muted-foreground">
                  {user.spent > 0 ? `₽ ${user.spent.toLocaleString("ru-RU")}` : "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.registeredAt}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
