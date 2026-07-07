"use client"

import { useState } from "react"
import {
  Plus,
  ChevronDown,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  GalleryHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { contentRows, type ContentRow } from "@/lib/content-data"

const columns = [
  { key: "topic", label: "Тематика", sortable: true },
  { key: "media", label: "Медиа", sortable: false },
  { key: "text", label: "Текст", sortable: true },
  { key: "format", label: "Формат", sortable: true },
  { key: "view", label: "Вид", sortable: true },
  { key: "addedAt", label: "Добавлено", sortable: true },
  { key: "author", label: "Добавил", sortable: true },
  { key: "publications", label: "Публикаций", sortable: true },
]

function FormatIcon({ type }: { type: ContentRow["format"] }) {
  const Icon = type === "story" ? GalleryHorizontal : LayoutGrid
  return <Icon className="size-5 text-foreground/80" strokeWidth={1.5} />
}

export function ContentTable() {
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(contentRows.filter((r) => r.selected).map((r) => r.id)),
  )

  const allSelected = selected.size === contentRows.length
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(contentRows.map((r) => r.id)))
  const toggleRow = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="flex h-screen flex-1 flex-col bg-background p-4">
      {/* Toolbar */}
      <div className="mb-4 flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="size-4" />
          Добавить
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">
          <ChevronDown className="size-4 text-muted-foreground" />
          Действия
        </button>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск"
            className="h-11 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring"
          />
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          Фильтры
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>

      {/* Table panel */}
      <div className="flex-1 overflow-auto rounded-2xl border border-border bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="w-14 px-5 py-4">
                <Checkbox checked={allSelected} onChange={toggleAll} />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-3 py-4 text-left text-sm font-normal text-muted-foreground",
                    col.key === "publications" && "pr-6 text-right",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      col.key === "publications" && "flex-row-reverse",
                    )}
                  >
                    {col.label}
                    {col.sortable && (
                      <ChevronDown className="size-3.5 text-muted-foreground/70" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contentRows.map((row) => {
              const isChecked = selected.has(row.id)
              return (
                <tr
                  key={row.id}
                  className="border-b border-border transition-colors hover:bg-muted/50"
                >
                  <td className="px-5 py-4 align-top">
                    <Checkbox
                      checked={isChecked}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                  <td className="px-3 py-4 align-top">
                    <span className="text-[15px] text-foreground">{row.topic}</span>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <div className="relative size-11 overflow-hidden rounded-lg">
                      <img
                        src="/media/selfie.png"
                        alt="Медиа поста"
                        className="size-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 flex size-4 items-center justify-center rounded bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf]">
                        <InstagramGlyph />
                      </span>
                    </div>
                  </td>
                  <td className="max-w-xs px-3 py-4 align-top">
                    <p className="text-sm leading-snug text-muted-foreground">
                      {row.text}
                    </p>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <FormatIcon type={row.format} />
                  </td>
                  <td className="px-3 py-4 align-top">
                    <FormatIcon type={row.view} />
                  </td>
                  <td className="px-3 py-4 align-top">
                    <span className="text-sm text-muted-foreground">{row.addedAt}</span>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <span className="text-[15px] text-foreground">{row.author}</span>
                  </td>
                  <td className="px-3 py-4 pr-6 text-right align-top">
                    <span className="text-[15px] text-foreground">
                      {row.publications}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "flex size-5 items-center justify-center rounded-[5px] border transition-colors",
        checked
          ? "border-primary bg-primary"
          : "border-input bg-transparent hover:border-muted-foreground",
      )}
    >
      {checked && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-3.5 text-primary-foreground"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  )
}
