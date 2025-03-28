import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CircleCheck, CircleDashed, CircleDot, DollarSign } from "lucide-react"

export function Module2Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Type B Resources</CardTitle>
            <CircleDot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">+4 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Resources</CardTitle>
            <CircleCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-muted-foreground">60% of total resources</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unassigned Jobs</CardTitle>
            <CircleDashed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">8 premium, 10 standard</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Week)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,890</div>
            <p className="text-xs text-muted-foreground">+22% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Status</CardTitle>
            <CardDescription>Current status of Type B resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { status: "Available", count: 52, color: "bg-green-500" },
              { status: "In Use", count: 24, color: "bg-blue-500" },
              { status: "Maintenance", count: 10, color: "bg-orange-500" },
            ].map((stat) => (
              <div key={stat.status} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{stat.status}</span>
                  <span className="font-medium">{stat.count}</span>
                </div>
                <Progress value={(stat.count / 86) * 100} className={`h-2 ${stat.color}`} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Distribution</CardTitle>
            <CardDescription>Current status of Module 2 jobs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { status: "Unassigned", count: 18, color: "bg-gray-500" },
              { status: "Resource Selected", count: 6, color: "bg-purple-500" },
              { status: "In Progress", count: 12, color: "bg-blue-500" },
              { status: "Completed", count: 42, color: "bg-green-500" },
            ].map((stat) => (
              <div key={stat.status} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{stat.status}</span>
                  <span className="font-medium">{stat.count}</span>
                </div>
                <Progress value={(stat.count / 78) * 100} className={`h-2 ${stat.color}`} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

