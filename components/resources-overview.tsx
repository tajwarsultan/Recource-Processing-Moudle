import { Progress } from "@/components/ui/progress"

export function ResourcesOverview() {
  const resourceStats = [
    { status: "Ready", count: 78, color: "bg-green-500" },
    { status: "In Prep (Step 2)", count: 34, color: "bg-yellow-500" },
    { status: "In Prep (Step 1)", count: 18, color: "bg-orange-500" },
    { status: "New", count: 12, color: "bg-blue-500" },
  ]

  const total = resourceStats.reduce((sum, stat) => sum + stat.count, 0)

  return (
    <div className="space-y-4">
      {resourceStats.map((stat) => (
        <div key={stat.status} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{stat.status}</span>
            <span className="font-medium">{stat.count}</span>
          </div>
          <Progress value={(stat.count / total) * 100} className={`h-2 ${stat.color}`} />
        </div>
      ))}
    </div>
  )
}

