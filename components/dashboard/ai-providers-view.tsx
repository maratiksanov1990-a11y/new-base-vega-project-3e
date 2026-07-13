"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ApiKeysTable } from "@/components/dashboard/api-keys-table"
import { AiModelsTable } from "@/components/dashboard/ai-models-table"

export type AiProvidersTab = "keys" | "models"

export function AiProvidersView({ onTabChange }: { onTabChange?: (tab: AiProvidersTab) => void }) {
  const [tab, setTab] = useState<AiProvidersTab>("keys")

  const handleChange = (value: string) => {
    const next = value as AiProvidersTab
    setTab(next)
    onTabChange?.(next)
  }

  return (
    <Tabs value={tab} onValueChange={handleChange} className="flex min-h-0 flex-1 flex-col gap-4">
      <TabsList className="w-fit">
        <TabsTrigger value="keys">API ключи</TabsTrigger>
        <TabsTrigger value="models">AI модели</TabsTrigger>
      </TabsList>
      <TabsContent value="keys" className="flex min-h-0 flex-1 flex-col data-[state=inactive]:hidden">
        <ApiKeysTable />
      </TabsContent>
      <TabsContent value="models" className="flex min-h-0 flex-1 flex-col data-[state=inactive]:hidden">
        <AiModelsTable />
      </TabsContent>
    </Tabs>
  )
}
