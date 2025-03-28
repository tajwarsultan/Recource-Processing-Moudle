import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceTimeline } from "@/components/resource-timeline"
import { ResourceMetadata } from "@/components/resource-metadata"
import { ArrowLeft, Edit, Trash2, PenToolIcon as Tool, CheckCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// This would normally come from an API call
const mockResource = {
  id: "RESB-003",
  name: "Type B Resource 3",
  category: "Premium",
  status: "Available",
  description: "This is a sample Type B digital resource used for processing customer requests.",
  metadata: {
    createdBy: "admin",
    version: "1.0",
    category: "premium",
    tags: ["high-quality", "versatile"],
  },
  usageCount: 1,
  lastUsed: "2023-04-05",
  createdAt: "2023-04-03T10:30:00Z",
  updatedAt: "2023-04-05T14:45:00Z",
  timeline: [
    { date: "2023-04-03T10:30:00Z", action: "Created", user: "admin" },
    { date: "2023-04-04T09:15:00Z", action: "Assigned to Job JOB-2001", user: "OpsType2" },
    { date: "2023-04-05T14:45:00Z", action: "Released from Job JOB-2001", user: "OpsType2" },
  ],
}

export default function TypeBResourceDetailPage({ params }: { params: { id: string } }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "In Use":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      case "Maintenance":
        return "bg-orange-500/20 text-orange-700 dark:text-orange-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Premium":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-400"
      case "Standard":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  const getNextAction = (status: string) => {
    switch (status) {
      case "Available":
        return "Assign to Job"
      case "In Use":
        return "View Current Job"
      case "Maintenance":
        return "Mark as Available"
      default:
        return "No Action"
    }
  }

  const getActionButton = (status: string) => {
    switch (status) {
      case "Available":
        return (
          <Button asChild>
            <Link href="/module2-jobs/new">
              <CheckCircle className="mr-2 h-4 w-4" />
              Assign to Job
            </Link>
          </Button>
        )
      case "In Use":
        return (
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            View Current Job
          </Button>
        )
      case "Maintenance":
        return (
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Available
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/type-b-resources">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Type B Resource Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{mockResource.name}</CardTitle>
                <CardDescription>{mockResource.id}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge className={cn("font-normal", getCategoryColor(mockResource.category))}>
                  {mockResource.category}
                </Badge>
                <Badge className={cn("font-normal", getStatusColor(mockResource.status))}>{mockResource.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockResource.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Usage Count</p>
                  <p className="font-medium">{mockResource.usageCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Used</p>
                  <p className="font-medium">{mockResource.lastUsed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p className="font-medium">{new Date(mockResource.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{new Date(mockResource.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/type-b-resources/${params.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
              {getActionButton(mockResource.status)}
            </CardFooter>
          </Card>

          <Tabs defaultValue="timeline">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Timeline</CardTitle>
                  <CardDescription>History of actions performed on this resource</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResourceTimeline timeline={mockResource.timeline} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="metadata">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Metadata</CardTitle>
                  <CardDescription>Technical details and properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResourceMetadata metadata={mockResource.metadata} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Actions</CardTitle>
              <CardDescription>Available actions for this resource</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-md bg-muted">
                <h3 className="font-medium">Current: {mockResource.status}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockResource.status === "Available"
                    ? "Resource is available for assignment to jobs."
                    : mockResource.status === "In Use"
                      ? "Resource is currently assigned to a job."
                      : "Resource is undergoing maintenance."}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Next Action</h3>
                {getActionButton(mockResource.status)}

                {mockResource.status !== "Maintenance" && (
                  <Button variant="outline" className="w-full mt-2">
                    <Tool className="mr-2 h-4 w-4" />
                    Send to Maintenance
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>Recent jobs using this resource</CardDescription>
            </CardHeader>
            <CardContent>
              {mockResource.usageCount > 0 ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-md border">
                    <div className="font-medium">Job JOB-2001</div>
                    <div className="text-sm text-muted-foreground">Used on: {mockResource.lastUsed}</div>
                    <div className="text-sm text-muted-foreground">Duration: 1 day</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">This resource has not been used in any jobs yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

