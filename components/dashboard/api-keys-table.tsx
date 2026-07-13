"use client"

import { useState } from "react"
import { Plus, Trash2, RefreshCw, Eye, EyeOff } from "lucide-react"
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
import { apiKeys as initialKeys, type ApiKeyStatus, type ApiKeyProvider } from "@/lib/ai-admin-data"

const statusConfig: Record<ApiKeyStatus, { label: string; className: string }> = {
  "Активен":  { label: "Активен",  className: "bg-chart-3/15 text-chart-3 border-transparent"         },
  "Лимит":    { label: "Лимит",    className: "bg-chart-2/15 text-chart-2 border-transparent"         },
  "Ошибка":   { label: "Ошибка",   className: "bg-destructive/15 text-destructive border-transparent"  },
  "Отключён": { label: "Отключён", className: "bg-muted text-muted-foreground border-transparent"      },
}

type KeyForm = { name: string; provider: ApiKeyProvider; key: string }
const emptyForm: KeyForm = { name: "", provider: "kie.ai", key: "" }

export function ApiKeysTable() {
  const [items, setItems]       = useState(initialKeys)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm]         = useState<KeyForm>(emptyForm)

  const toggleReveal = (id: string) =>
    setRevealed((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })

  const handleDelete = (id: string) =>
    setItems((prev) => prev.filter((k) => k.id !== id))

  const handleAdd = () => {
    if (!form.name.trim() || !form.key.trim()) return
    const newId = `K-${String(items.length + 1).padStart(3, "0")}`
    const now = new Date().toLocaleDateString("ru-RU")
    setItems((prev) => [...prev, {
      id: newId, name: form.name, provider: form.provider, key: form.key,
      status: "Активен", balance: null, checkedAt: "—",
      requestsToday: 0, requestsLimit: 10, requestsTotal: 0,
      lastUsed: "—", createdAt: now,
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
              <TableHead className="min-w-[100px]">Провайдер</TableHead>
              <TableHead className="min-w-[120px]">Название</TableHead>
              <TableHead className="min-w-[100px]">Статус</TableHead>
              <TableHead className="min-w-[120px]">Баланс</TableHead>
              <TableHead className="min-w-[180px]">Проверен</TableHead>
              <TableHead className="min-w-[100px] pr-4 text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((key) => {
              const status = statusConfig[key.status]
              const isRevealed = revealed.has(key.id)
              return (
                <TableRow key={key.id} className="h-14">
                  <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{key.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{key.provider}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{key.name}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-6 shrink-0 text-muted-foreground"
                        onClick={() => toggleReveal(key.id)}
                      >
                        {isRevealed ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                      </Button>
                      {isRevealed && (
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                          {key.key}
                        </code>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs font-medium", status.className)}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    {key.balance !== null ? (
                      <span className={cn(
                        "text-sm font-medium",
                        key.balance < 5 ? "text-destructive" : "text-foreground"
                      )}>
                        ${key.balance.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{key.checkedAt}</TableCell>
                  <TableCell className="pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-muted-foreground"
                        title="Проверить баланс"
                      >
                        <RefreshCw className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-muted-foreground"
                        onClick={() => handleDelete(key.id)}
                        title="Удалить"
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
            <DialogTitle>Добавить API ключ</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="key-provider">Провайдер</Label>
              <select
                id="key-provider"
                value={form.provider}
                onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value as ApiKeyProvider }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
              >
                {providers.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="key-name">Название</Label>
              <Input
                id="key-name"
                placeholder="kie-07"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="key-value">API ключ</Label>
              <Input
                id="key-value"
                placeholder="sk-kie-..."
                value={form.key}
                onChange={(e) => setForm((f) => ({ ...f, key: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleAdd}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <button id="add-api-key-trigger" className="hidden" onClick={() => setDialogOpen(true)} />
    </>
  )
}
