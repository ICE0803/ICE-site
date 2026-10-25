import type { ProjectStatus } from "@/types"
import { cn } from "@/lib/utils"

const statusMap: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: "已上线", className: "text-emerald-300/90" },
  "in-progress": { label: "进行中", className: "text-amber-300/90" },
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = statusMap[status]
  return (
    <span
      className={cn(
        "glass-chip inline-flex items-center rounded-md px-2 py-0.5 text-xs",
        s.className,
      )}
    >
      {s.label}
    </span>
  )
}
