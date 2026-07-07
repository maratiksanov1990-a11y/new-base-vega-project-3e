import { PostingSidebar } from "@/components/posting/posting-sidebar"
import { ContentTable } from "@/components/posting/content-table"

export function Dashboard() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <PostingSidebar />
      <ContentTable />
    </div>
  )
}
