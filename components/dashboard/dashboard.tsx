import { PostingSidebar } from "@/components/posting/posting-sidebar"
import { ContentTable } from "@/components/posting/content-table"

export function Dashboard() {
  return (
    <div className="dark flex h-screen w-full overflow-hidden bg-[#0c0c0c]">
      <PostingSidebar />
      <ContentTable />
    </div>
  )
}
