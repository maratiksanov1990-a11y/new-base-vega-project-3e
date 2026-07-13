"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus, FlaskConical, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { aiModels as initialModels, type AiModel, type AiModelStatus } from "@/lib/ai-admin-data"

const statusConfig: Record<AiModelStatus, { label: string; icon: React.ElementType; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  "Активна":      { label: "Активна",      icon: CheckCircle2,  variant: "default"     },
  "Отключена":    { label: "Отключена",    icon: XCircle,       variant: "secondary"   },
  "Тестирование": { label: "Тестирование", icon: FlaskConical,  variant: "outline"     },
}

const emptyModel: Omit<AiModel, "id"> = {
  name: "", provider: "kie.ai", modelId: "", status: "Активна",
  costPerGen: 0, avgDuration: 0, generationsTotal: 0, successRate: 100, addedAt: "",
}

export function AiModelsTable() {
  const [models, setModels] = useState<AiModel[]>(initialModels)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<AiModel | null>(null)
  const [form, setForm] = useState<Omit<AiModel, "id">>(emptyModel)

  const openAdd = () => {
    setEditing(null)
    setForm({ ...emptyModel, addedAt: new Date().toLocaleDateString("ru-RU") })
    setDialogOpen(true)
  }

  const openEdit = (m: AiModel) => {
    setEditing(m)
    setForm({ name: m.name, provider: m.provider, modelId: m.modelId, status: m.status, costPerGen: m.costPerGen, avgDuration: m.avgDuration, generationsTotal: m.generationsTotal, successRate: m.successRate, addedAt: m.addedAt })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!form.name || !form.modelId) return
    if (editing) {
      setModels(prev => prev.map(m => m.id === editing.id ? { ...editing, ...form } : m))
    } else {
      setModels(prev => [...prev, { id: `M-${String(prev.length + 1).padStart(3, "0")}`, ...form }])
    }
    setDialogOpen(false)
  }

  const handleDelete = (id: string) => setModels(prev => prev.filter(m => m.id !== id))

  return (
    <>
      <button id="add-ai-model-trigger" className="hidden" onClick={openAdd} />

      <div className="flex min-h-0 max-h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <Table containerClassName="overflow-auto">
          <TableHeader className="[&_tr]:border-b-0 [&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card [&_th]:shadow-[inset_0_-1px_0_0_var(--border)]">
            <TableRow className="h-14 hover:bg-transparent">
              <TableHead className="w-10 pl-4">#</TableHead>
              <TableHead className="min-w-[160px]">Название</TableHead>
              <TableHead className="min-w-[90px]">Поставщик</TableHead>
              <TableHead className="min-w-[220px]">Model ID</TableHead>
              <TableHead className="min-w-[130px]">Статус</TableHead>
              <TableHead className="min-w-[110px] text-right">Себестоимость</TableHead>
              <TableHead className="min-w-[110px] text-right">Ср. время</TableHead>
              <TableHead className="min-w-[110px] text-right">Генераций</TableHead>
              <TableHead className="min-w-[100px] text-right">Успешность</TableHead>
              <TableHead className="min-w-[110px]">Добавлена</TableHead>
              <TableHead className="pr-4 text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((m, i) => {
              const s = statusConfig[m.status]
              const StatusIcon = s.icon
              return (
                <TableRow key={m.id} className="h-14">
                  <TableCell className="pl-4 text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">{m.provider}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{m.modelId}</TableCell>
                  <TableCell>
                    <Badge variant={s.variant} className="gap-1">
                      <StatusIcon className="size-3" />
                      {s.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">₽{m.costPerGen}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{m.avgDuration}с</TableCell>
                  <TableCell className="text-right text-muted-foreground">{m.generationsTotal.toLocaleString("ru-RU")}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{m.successRate}%</TableCell>
                  <TableCell className="text-muted-foreground">{m.addedAt}</TableCell>
                  <TableCell className="pr-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="size-7" onClick={() => openEdit(m)}>
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-7 text-destructive hover:text-destructive" onClick={() => handleDelete(m.id)}>
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
            <DialogTitle>{editing ? "Редактировать модель" : "Добавить модель"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <Label>Название</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="GPT Image 1.5" />
            </div>
            <div className="grid gap-1.5">
              <Label>Model ID</Label>
              <Input value={form.modelId} onChange={e => setForm(f => ({ ...f, modelId: e.target.value }))} placeholder="gpt-image-1.5" className="font-mono text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Поставщик</Label>
                <Select value={form.provider} onValueChange={v => setForm(f => ({ ...f, provider: v as AiModel["provider"] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kie.ai">kie.ai</SelectItem>
                    <SelectItem value="fal.ai">fal.ai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Статус</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as AiModelStatus }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Активна">Активна</SelectItem>
                    <SelectItem value="Отключена">Отключена</SelectItem>
                    <SelectItem value="Тестирование">Тестирование</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Себестоимость (₽)</Label>
                <Input type="number" value={form.costPerGen} onChange={e => setForm(f => ({ ...f, costPerGen: Number(e.target.value) }))} />
              </div>
              <div className="grid gap-1.5">
                <Label>Ср. время (сек)</Label>
                <Input type="number" value={form.avgDuration} onChange={e => setForm(f => ({ ...f, avgDuration: Number(e.target.value) }))} />
              </div>
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
