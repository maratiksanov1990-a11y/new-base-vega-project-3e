"use client"

import { useState } from "react"
import { Trash2, Power } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { cn } from "@/lib/utils"
import { aiModels as initialModels, type AiModelStatus, type ApiKeyProvider } from "@/lib/ai-admin-data"

const statusConfig: Record<AiModelStatus, { label: string; className: string }> = {
  "Активна":      { label: "Активна",      className: "bg-chart-3/15 text-chart-3 border-transparent"         },
  "Тестирование": { label: "Тестирование", className: "bg-chart-2/15 text-chart-2 border-transparent"         },
  "Отключена":    { label: "Отключена",    className: "bg-muted text-muted-foreground border-transparent"     },
}

type ModelForm = { name: string; provider: ApiKeyProvider; modelId: string; costPerGen: string }
const emptyForm: ModelForm = { name: "", provider: "kie.ai", modelId: "", costPerGen: "" }

export function AiModelsTable() {
  const [items, setItems] = useState(initialModels)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<ModelForm>(emptyForm)

  const handleDelete = (id: string) => setItems((prev) => prev.filter((m) => m.id !== id))

  const handleToggle = (id: string) =>
    setItems((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "Отключена" ? ("Активна" as const) : ("Отключена" as const) }
          : m,
      ),
    )

  const handleAdd = () => {
    if (!form.name.trim() || !form.modelId.trim()) return
    const newId = `M-${String(items.length + 1).padStart(3, "0")}`
    const now = new Date().toLocaleDateString("ru-RU")
    setItems((prev) => [...prev, {
      id: newId, name: form.name, provider: form.provider, modelId: form.modelId,
      status: "Тестирование", costPerGen: parseInt(form.costPerGen) || 0,
      avgDuration: 0, generationsTotal: 0, successRate: 0, addedAt: now,
    }])
    setDialogOpen(false)
    setForm(emptyForm)
  }

  const providers: ApiKeyProvider[] = ["kie.ai", "fal.ai"]

  return (
    <>
      <div className="flex min-h-0 max-h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <Table containerClassName="overflow-auto">
          <TableHeader className="[&_tr]:border-b-0 [&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card [&_th]:shadow-[inset_0_-1px_0_0_var(--border)]">
            <TableRow className="h-14 hover:bg-transparent">
              <TableHead className="min-w-[80px] pl-4">ID</TableHead>
              <TableHead className="min-w-[160px]">Модель</TableHead>
              <TableHead className="min-w-[90px]">Провайдер</TableHead>
              <TableHead className="min-w-[200px]">Model ID</TableHead>
              <TableHead className="min-w-[120px]">Статус</TableHead>
              <TableHead className="min-w-[130px] text-center">Себестоимость</TableHead>
              <TableHead className="min-w-[110px] text-center">Ср. время</TableHead>
              <TableHead className="min-w-[110px] text-center">Генераций</TableHead>
              <TableHead className="min-w-[100px] text-center">Успешность</TableHead>
              <TableHead className="min-w-[100px] pr-4 text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((model) => {
              const status = statusConfig[model.status]
              return (
                <TableRow key={model.id} className="h-14">
                  <TableCell className="pl-4 font-medium text-muted-foreground">{model.id}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{model.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{model.provider}</Badge>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                      {model.modelId}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs font-medium", status.className)}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {model.costPerGen > 0 ? `₽ ${model.costPerGen}` : "—"}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {model.avgDuration > 0 ? `${model.avgDuration} сек` : "—"}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {model.generationsTotal.toLocaleString("ru-RU")}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {model.successRate > 0 ? `${model.successRate}%` : "—"}
                  </TableCell>
                  <TableCell className="pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-muted-foreground"
                        onClick={() => handleToggle(model.id)}
                        aria-label={model.status === "Отключена" ? "Включить модель" : "Отключить модель"}
                      >
                        <Power className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-muted-foreground"
                        onClick={() => handleDelete(model.id)}
                        aria-label="Удалить модель"
                      >
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить AI модель</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model-name">Название</Label>
              <Input id="model-name" placeholder="GPT Image 1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model-provider">Провайдер</Label>
              <select
                id="model-provider"
                value={form.provider}
                onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value as ApiKeyProvider }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
              >
                {providers.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model-id">Model ID</Label>
              <Input id="model-id" placeholder="gpt-image-1.5" value={form.modelId} onChange={(e) => setForm((f) => ({ ...f, modelId: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model-cost">Себестоимость, ₽</Label>
              <Input id="model-cost" type="number" placeholder="18" value={form.costPerGen} onChange={(e) => setForm((f) => ({ ...f, costPerGen: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleAdd}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <button id="add-ai-model-trigger" className="hidden" onClick={() => setDialogOpen(true)} />
    </>
  )
}
