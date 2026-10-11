import type { ProjectStatus } from "@/types"
import { cn } from "@/lib/utils"

const statusMap: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: "已上线", className: "text-emerald-300/80 border-emerald-400/25" },
  "in-progress": { label: "进行中", className: "text-amber-300/80 border-amber-400/25" },
  archived: { label: "已归档", className: "text-muted-foreground border-border" },
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = statusMap[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs",
        s.className,
      )}
    >
      {s.label}
    </span>
  )
}
