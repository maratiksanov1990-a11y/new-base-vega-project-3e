"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { prompts as initialPrompts, type PromptStatus, type PromptCategory } from "@/lib/ai-admin-data"

const statusConfig: Record<PromptStatus, { label: string; className: string }> = {
  "Активен":   { label: "Активен",   className: "bg-chart-3/15 text-chart-3 border-transparent"         },
  "Черновик":  { label: "Черновик",  className: "bg-chart-2/15 text-chart-2 border-transparent"        },
  "Архив":     { label: "Архив",     className: "bg-muted text-muted-foreground border-transparent"     },
}

const categoryColors: Record<PromptCategory, string> = {
  "Образы":    "bg-chart-1/15 text-chart-1 border-transparent",
  "Прически":  "bg-chart-4/15 text-chart-4 border-transparent",
  "Одежда":    "bg-chart-5/15 text-chart-5 border-transparent",
  "Открытки":  "bg-chart-2/15 text-chart-2 border-transparent",
  "Сезонные":  "bg-chart-3/15 text-chart-3 border-transparent",
}

type PromptForm = {
  title: string
  category: PromptCategory
  prompt: string
}

const emptyForm: PromptForm = { title: "", category: "Образы", prompt: "" }

export function PromptsTable() {
  const [items, setItems] = useState(initialPrompts)
  const [selected, setSelected] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<PromptForm>(emptyForm)

  const toggleAll = () =>
    setSelected(selected.length === items.length ? [] : items.map((p) => p.id))
  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  const openEdit = (id: string) => {
    const item = items.find((p) => p.id === id)
    if (!item) return
    setEditing(id)
    setForm({ title: item.title, category: item.category, prompt: item.prompt })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!form.title.trim() || !form.prompt.trim()) return
    const now = new Date().toLocaleDateString("ru-RU")
    if (editing) {
      setItems((prev) => prev.map((p) => p.id === editing ? { ...p, ...form, updatedAt: now } : p))
    } else {
      const newId = `P-${String(items.length + 1).padStart(3, "0")}`
      setItems((prev) => [...prev, {
        id: newId, ...form, model: "GPT Image 1.5", status: "Черновик",
        usages: 0, successRate: 0, createdAt: now, updatedAt: now,
      }])
    }
    setDialogOpen(false)
  }

  const handleDelete = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id))

  const categories: PromptCategory[] = ["Образы", "Прически", "Одежда", "Открытки", "Сезонные"]

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <Table containerClassName="flex-1 overflow-auto">
          <TableHeader className="[&_tr]:border-b-0 [&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card [&_th]:shadow-[inset_0_-1px_0_0_var(--border)]">
            <TableRow className="h-14 hover:bg-transparent">
              <TableHead className="w-12 pl-4">
                <Checkbox checked={selected.length === items.length && items.length > 0} onCheckedChange={toggleAll} aria-label="Выбрать все" />
              </TableHead>
              <TableHead className="min-w-[80px]">ID</TableHead>
              <TableHead className="min-w-[180px]">Название</TableHead>
              <TableHead className="min-w-[120px]">Категория</TableHead>
              <TableHead className="min-w-[120px]">Модель</TableHead>
              <TableHead className="min-w-[100px]">Статус</TableHead>
              <TableHead className="min-w-[90px] text-center">Использований</TableHead>
              <TableHead className="min-w-[90px] text-center">Успех, %</TableHead>
              <TableHead className="min-w-[110px]">Обновлён</TableHead>
              <TableHead className="min-w-[110px] pr-4 text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const status = statusConfig[item.status]
              const isSelected = selected.includes(item.id)
              return (
                <TableRow key={item.id} className={cn("h-14", isSelected && "bg-muted/40")}>
                  <TableCell className="pl-4">
                    <Checkbox checked={isSelected} onCheckedChange={() => toggle(item.id)} aria-label={`Выбрать ${item.id}`} />
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">{item.id}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{item.title}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", categoryColors[item.category])}>{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.model}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs font-medium", status.className)}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{item.usages}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {item.successRate > 0 ? `${item.successRate}%` : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.updatedAt}</TableCell>
                  <TableCell className="pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="size-8" onClick={() => openEdit(item.id)}>
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="size-8 text-muted-foreground" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Редактировать промт" : "Добавить промт"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prompt-title">Название</Label>
              <Input
                id="prompt-title"
                placeholder="Например: Лето на пляже"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prompt-category">Категория</Label>
              <select
                id="prompt-category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as PromptCategory }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prompt-text">Промт</Label>
              <Textarea
                id="prompt-text"
                placeholder="Введите текст промта для модели..."
                rows={5}
                value={form.prompt}
                onChange={(e) => setForm((f) => ({ ...f, prompt: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSave}>{editing ? "Сохранить" : "Добавить"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

      {/* скрытая кнопка для внешнего вызова диалога */}
      <button id="add-prompt-trigger" className="hidden" onClick={openAdd} />
