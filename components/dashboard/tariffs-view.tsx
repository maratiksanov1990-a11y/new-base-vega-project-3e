"use client"

import { useState } from "react"
import { Pencil, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { tariffs as initialTariffs, type TariffStatus } from "@/lib/ai-admin-data"

const statusConfig: Record<TariffStatus, { label: string; className: string }> = {
  "Активен": { label: "Активен", className: "bg-chart-3/15 text-chart-3 border-transparent" },
  "Скрыт":   { label: "Скрыт",   className: "bg-muted text-muted-foreground border-transparent" },
}

type TariffForm = { name: string; generations: string; price: string }
const emptyForm: TariffForm = { name: "", generations: "", price: "" }

export function TariffsView() {
  const [items, setItems] = useState(initialTariffs)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<TariffForm>(emptyForm)

  const openAdd = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true) }
  const openEdit = (id: string) => {
    const item = items.find((t) => t.id === id)
    if (!item) return
    setEditing(id)
    setForm({ name: item.name, generations: String(item.generations), price: String(item.price) })
    setDialogOpen(true)
  }

  const handleSave = () => {
    const gens = parseInt(form.generations) || 0
    const price = parseInt(form.price) || 0
    const pricePerGen = gens > 0 ? Math.round(price / gens) : 0
    const basePrice = 100
    const discount = gens > 1 ? `${Math.round((1 - pricePerGen / basePrice) * 100)}%` : "—"

    if (editing) {
      setItems((prev) => prev.map((t) => t.id === editing ? { ...t, name: form.name, generations: gens, price, pricePerGen, discount } : t))
    } else {
      const newId = `T-${String(items.length + 1).padStart(3, "0")}`
      setItems((prev) => [...prev, {
        id: newId, name: form.name, generations: gens, price, pricePerGen, discount,
        status: "Активен", purchases: 0, revenue: 0,
      }])
    }
    setDialogOpen(false)
  }

  const toggleStatus = (id: string) =>
    setItems((prev) => prev.map((t) => t.id === id ? { ...t, status: t.status === "Активен" ? "Скрыт" : "Активен" } : t))

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-auto">
      {/* Карточки тарифов */}
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((tariff) => {
          const status = statusConfig[tariff.status]
          return (
            <Card key={tariff.id} className={cn("border-border/60 transition-opacity", tariff.status === "Скрыт" && "opacity-50")}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-semibold text-foreground">{tariff.name}</p>
                    <p className="text-xs text-muted-foreground">₽ {tariff.pricePerGen} за генерацию</p>
                  </div>
                  <Badge className={cn("text-xs shrink-0", status.className)}>{status.label}</Badge>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-semibold tracking-tight text-foreground">₽ {tariff.price}</span>
                    {tariff.discount !== "—" && (
                      <span className="ml-2 rounded-full bg-chart-3/15 px-2 py-0.5 text-xs font-medium text-chart-3">
                        -{tariff.discount}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{tariff.purchases} покупок</span>
                  <span>·</span>
                  <span>₽ {tariff.revenue.toLocaleString("ru-RU")} выручки</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(tariff.id)}>
                    <Pencil className="size-3.5" />
                    Изменить
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => toggleStatus(tariff.id)}>
                    {tariff.status === "Активен" ? "Скрыть" : "Показать"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Таблица детализации */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader className="[&_tr]:border-b-0 [&_th]:bg-card [&_th]:shadow-[inset_0_-1px_0_0_var(--border)]">
            <TableRow className="h-14 hover:bg-transparent">
              <TableHead className="min-w-[80px] pl-4">ID</TableHead>
              <TableHead className="min-w-[160px]">Название</TableHead>
              <TableHead className="min-w-[100px] text-center">Генераций</TableHead>
              <TableHead className="min-w-[110px] text-right">Цена</TableHead>
              <TableHead className="min-w-[110px] text-right">Цена/ген.</TableHead>
              <TableHead className="min-w-[80px] text-center">Скидка</TableHead>
              <TableHead className="min-w-[100px]">Статус</TableHead>
              <TableHead className="min-w-[110px] text-center">Покупок</TableHead>
              <TableHead className="min-w-[130px] pr-4 text-right">Выручка</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((tariff) => {
              const status = statusConfig[tariff.status]
              return (
                <TableRow key={tariff.id} className="h-14">
                  <TableCell className="pl-4 font-medium text-muted-foreground">{tariff.id}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{tariff.name}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{tariff.generations}</TableCell>
                  <TableCell className="text-right text-sm text-foreground">₽ {tariff.price}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">₽ {tariff.pricePerGen}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{tariff.discount}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs font-medium", status.className)}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{tariff.purchases}</TableCell>
                  <TableCell className="pr-4 text-right text-sm text-foreground">
                    ₽ {tariff.revenue.toLocaleString("ru-RU")}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editing ? "Редактировать тариф" : "Добавить тариф"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tariff-name">Название</Label>
              <Input id="tariff-name" placeholder="3 генерации" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tariff-gens">Количество генераций</Label>
              <Input id="tariff-gens" type="number" placeholder="3" value={form.generations} onChange={(e) => setForm((f) => ({ ...f, generations: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tariff-price">Цена, ₽</Label>
              <Input id="tariff-price" type="number" placeholder="225" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSave}>{editing ? "Сохранить" : "Добавить"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


