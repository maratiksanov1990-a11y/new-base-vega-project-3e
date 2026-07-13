"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, type SidebarMode } from "@/components/dashboard/app-sidebar"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { GenerationsTable } from "@/components/dashboard/generations-table"
import { PromptsTable } from "@/components/dashboard/prompts-table"
import { UsersTable } from "@/components/dashboard/users-table"
import { ApiKeysTable } from "@/components/dashboard/api-keys-table"
import { AiModelsTable } from "@/components/dashboard/ai-models-table"
import { TariffsView } from "@/components/dashboard/tariffs-view"
import { StatCards } from "@/components/dashboard/stat-cards"

type Section = "Обзор" | "Генерации" | "Промты" | "Пользователи" | "API ключи" | "AI модели" | "Тарифы" | "Аналитика"

const sectionConfig: Record<Section, {
  buttonLabel: string
  searchPlaceholder: string
  hasButton: boolean
  hasSearch: boolean
}> = {
  "Обзор":         { buttonLabel: "Новый заказ",     searchPlaceholder: "Поиск заказов…",       hasButton: true,  hasSearch: true  },
  "Генерации":     { buttonLabel: "",                 searchPlaceholder: "Поиск генераций…",     hasButton: false, hasSearch: true  },
  "Промты":        { buttonLabel: "Добавить промт",   searchPlaceholder: "Поиск промтов…",       hasButton: true,  hasSearch: true  },
  "Пользователи":  { buttonLabel: "",                 searchPlaceholder: "Поиск пользователей…", hasButton: false, hasSearch: true  },
  "API ключи":     { buttonLabel: "Добавить ключ",    searchPlaceholder: "Поиск ключей…",        hasButton: true,  hasSearch: true  },
  "AI модели":     { buttonLabel: "Добавить модель",  searchPlaceholder: "Поиск моделей…",       hasButton: true,  hasSearch: true  },
  "Тарифы":        { buttonLabel: "Добавить тариф",   searchPlaceholder: "",                     hasButton: true,  hasSearch: false },
  "Аналитика":     { buttonLabel: "",                 searchPlaceholder: "",                     hasButton: false, hasSearch: false },
}

export function Dashboard() {
  const [active, setActive] = useState<Section>("Обзор")
  const [mode, setMode] = useState<SidebarMode>("hover")

  const cfg = sectionConfig[active] ?? sectionConfig["Обзор"]

  const handleAddClick = () => {
    if (active === "Промты") {
      document.getElementById("add-prompt-trigger")?.click()
    } else if (active === "API ключи") {
      document.getElementById("add-api-key-trigger")?.click()
    } else if (active === "AI модели") {
      document.getElementById("add-ai-model-trigger")?.click()
    }
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar active={active} onSelect={(s) => setActive(s as Section)} onModeChange={setMode} />
      <SidebarInset
        className="flex h-svh flex-col overflow-hidden"
        style={{
          marginLeft: mode === "pinned" ? "var(--sidebar-width)" : 0,
          paddingLeft: mode === "hover" ? "var(--sidebar-width-icon)" : 0,
          transition: "margin-left 35ms cubic-bezier(0.4,0,0.2,1), padding-left 35ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Шапка */}
        <header className="flex h-12 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-foreground">{active}</h1>
          </div>
          <div className="flex items-center gap-2">
            {cfg.hasSearch && (
              <div className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={cfg.searchPlaceholder}
                  className="h-8 pl-9"
                  aria-label={cfg.searchPlaceholder}
                />
              </div>
            )}
            {cfg.hasButton && (
              <Button size="sm" className="h-8 shrink-0" onClick={handleAddClick}>
                <Plus className="size-4" />
                {cfg.buttonLabel}
              </Button>
            )}
          </div>
        </header>

        {/* Контент */}
        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-6">
          {active === "Обзор" && (
            <>
              <StatCards />
              <div className="flex min-h-0 flex-1 flex-col">
                <OrdersTable />
              </div>
            </>
          )}
          {active === "Генерации"    && <div className="flex min-h-0 flex-1 flex-col"><GenerationsTable /></div>}
          {active === "Промты"       && <div className="flex min-h-0 flex-1 flex-col"><PromptsTable /></div>}
          {active === "Пользователи" && <div className="flex min-h-0 flex-1 flex-col"><UsersTable /></div>}
          {active === "API ключи"    && <div className="flex min-h-0 flex-1 flex-col"><ApiKeysTable /></div>}
          {active === "AI модели"    && <div className="flex min-h-0 flex-1 flex-col"><AiModelsTable /></div>}
          {active === "Тарифы"       && <TariffsView />}
          {active === "Аналитика"    && (
            <div className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
              Аналитика в разработке
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
