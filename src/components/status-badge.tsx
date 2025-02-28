import type { MatchStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: MatchStatus
  label: string
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const getBgColor = () => {
    switch (status) {
      case "Ongoing":
        return "bg-[#43AD28]"
      case "Finished":
        return "bg-[#EB0237]"
      case "Scheduled":
        return "bg-[#EB6402]"
      default:
        return "bg-gray-500"
    }
  }

  return <div className={`${getBgColor()} text-white text-xs text-center h-6 min-w-24 px-3 py-1 rounded-md`}>{label}</div>
}

