"use client"

import { useState } from "react"
import {
  Box,
  ChevronDown,
  ChevronsLeft,
  Navigation,
  Blocks,
  Droplet,
  Star,
  MoreVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Статистика", icon: Navigation },
  { label: "Группы", icon: Blocks },
  { label: "Контент", icon: Droplet, active: true },
  { label: "Реклама", icon: Star },
]

export function PostingSidebar() {
  const [active, setActive] = useState("Контент")

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col justify-between bg-[#0c0c0c] px-3 py-4 text-[#e5e5e5]">
      <div>
        {/* Workspace switcher */}
        <button className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#1a1a1a]">
          <span className="flex items-center gap-2.5">
            <Box className="size-5 text-[#e5e5e5]" />
            <span className="text-[15px] font-medium">Постинг</span>
          </span>
          <ChevronDown className="size-4 text-[#7a7a7a]" />
        </button>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.label
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors",
                  isActive
                    ? "bg-[#1c1c1c] text-white"
                    : "text-[#a1a1a1] hover:bg-[#161616] hover:text-white",
                )}
              >
                <Icon className="size-[18px]" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div>
        {/* Collapse */}
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-[#a1a1a1] transition-colors hover:bg-[#161616] hover:text-white">
          <ChevronsLeft className="size-[18px]" />
          Свернуть
        </button>

        {/* User */}
        <div className="mt-2 flex items-center justify-between rounded-lg px-2 py-2">
          <div className="flex items-center gap-2.5">
            <img
              src="/media/selfie.png"
              alt="Аватар пользователя"
              className="size-9 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm font-medium text-white">Марат</p>
              <p className="text-xs text-[#7a7a7a]">Admin</p>
            </div>
          </div>
          <button className="rounded-md p-1 text-[#7a7a7a] transition-colors hover:bg-[#1a1a1a] hover:text-white">
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
