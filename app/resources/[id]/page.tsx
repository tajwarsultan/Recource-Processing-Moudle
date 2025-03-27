import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceTimeline } from "@/components/resource-timeline"
import { ResourceMetadata } from "@/components/resource-metadata"
import { ArrowLeft, Edit, Trash2, ArrowRightCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// This would normally come from an API call
const mockResource = {
  id: "RES-001",
  name: "Resource A",
  type: "Type A",
  status: "In Prep (Step 1)",
  description: "This is a sample Type A digital resource used for processing customer requests.",
  metadata: {
    createdBy: "admin",
    version: "1.0",
    category: "standard",
    tags: ["premium", "high-priority"],
  },
  createdAt: "2023-04-01T10:30:00Z",
  updatedAt: "2023-04-05T14:45:00Z",
  timeline: [
    { date: "2023-04-01T10:30:00Z", action: "Created", user: "admin" },
    { date: "2023-04-02T09:15:00Z", action: "Started Prep (Step 1)", user: "InventoryPrepA" },
    { date: "2023-04-05T14:45:00Z", action: "Updated Metadata", user: "InventoryPrepA" },
  ],
}

export default function ResourceDetailPage({ params }: { params: { id: string } }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "In Prep (Step 2)":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
      case "In Prep (Step 1)":
        return "bg-orange-500/20 text-orange-700 dark:text-orange-400"
      case "New":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  const getNextAction = (status: string) => {
    switch (status) {
      case "New":
        return "Start Prep (Step 1)"
      case "In Prep (Step 1)":
        return "Move to Prep (Step 2)"
      case "In Prep (Step 2)":
        return "Mark as Ready"
      case "Ready":
        return "Assign to Job"
      default:
        return "No Action"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/resources">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Resource Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{mockResource.name}</CardTitle>
                <CardDescription>{mockResource.id}</CardDescription>
              </div>
              <Badge className={cn("font-normal", getStatusColor(mockResource.status))}>{mockResource.status}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockResource.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Resource Type</p>
                  <p className="font-medium">{mockResource.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p className="font-medium">{new Date(mockResource.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{new Date(mockResource.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created By</p>
                  <p className="font-medium">{mockResource.metadata.createdBy}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/resources/${params.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
              <Button>
                <ArrowRightCircle className="mr-2 h-4 w-4" />
                {getNextAction(mockResource.status)}
              </Button>
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
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Actions to prepare this resource</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-md bg-muted">
                <h3 className="font-medium">Current: {mockResource.status}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockResource.status === "In Prep (Step 1)"
                    ? "Resource is currently in the first preparation step."
                    : "Resource is ready to be assigned to a job."}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Next Action</h3>
                <Button className="w-full mt-2">{getNextAction(mockResource.status)}</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Jobs</CardTitle>
              <CardDescription>Jobs using this resource</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This resource has not been assigned to any jobs yet.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/jobs/new">Create New Job</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

