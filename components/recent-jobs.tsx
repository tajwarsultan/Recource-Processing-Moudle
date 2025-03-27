import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function RecentJobs() {
  const jobs = [
    { id: "JOB-1234", name: "Customer Request A", status: "Completed", date: "2023-04-10" },
    { id: "JOB-1235", name: "Customer Request B", status: "In Progress", date: "2023-04-09" },
    { id: "JOB-1236", name: "Customer Request C", status: "Payment Verified", date: "2023-04-08" },
    { id: "JOB-1237", name: "Customer Request D", status: "New", date: "2023-04-07" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "In Progress":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      case "Payment Verified":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-400"
      case "New":
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <div key={job.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
          <div>
            <div className="font-medium">{job.name}</div>
            <div className="text-xs text-muted-foreground">
              {job.id} • {job.date}
            </div>
          </div>
          <Badge className={cn("font-normal", getStatusColor(job.status))}>{job.status}</Badge>
        </div>
      ))}
    </div>
  )
}

