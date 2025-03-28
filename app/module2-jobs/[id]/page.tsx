import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResourceTimeline } from "@/components/resource-timeline"
import { ArrowLeft, Edit, Trash2, ArrowRightCircle, DollarSign } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// This would normally come from an API call
const mockJob = {
  id: "JOB-2003",
  name: "Module 2 Request C",
  platform: "Platform X",
  resourceId: null,
  status: "Unassigned",
  paymentStatus: "Verified",
  paymentAmount: 420.0,
  description: "This is a sample Module 2 job that requires a Type B resource.",
  resourceCategory: "Premium",
  createdAt: "2023-04-03T10:30:00Z",
  updatedAt: "2023-04-07T14:45:00Z",
  timeline: [
    { date: "2023-04-03T10:30:00Z", action: "Job Created", user: "admin" },
    { date: "2023-04-05T09:15:00Z", action: "Payment Verified", user: "admin" },
    { date: "2023-04-07T14:45:00Z", action: "Job Updated", user: "OpsType2" },
  ],
}

export default function Module2JobDetailPage({ params }: { params: { id: string } }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "In Progress":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      case "Resource Selected":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-400"
      case "Unassigned":
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "Pending":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
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
      case "Unassigned":
        return "Select Resource"
      case "Resource Selected":
        return "Start Processing"
      case "In Progress":
        return "Mark Completed"
      case "Completed":
        return "View Details"
      default:
        return "No Action"
    }
  }

  const getActionButton = (status: string) => {
    switch (status) {
      case "Unassigned":
        return (
          <Button asChild>
            <Link href={`/module2-jobs/${params.id}/select-resource`}>
              <ArrowRightCircle className="mr-2 h-4 w-4" />
              Select Resource
            </Link>
          </Button>
        )
      case "Resource Selected":
        return (
          <Button>
            <ArrowRightCircle className="mr-2 h-4 w-4" />
            Start Processing
          </Button>
        )
      case "In Progress":
        return (
          <Button>
            <ArrowRightCircle className="mr-2 h-4 w-4" />
            Mark Completed
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
          <Link href="/module2-jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Module 2 Job Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{mockJob.name}</CardTitle>
                <CardDescription>{mockJob.id}</CardDescription>
              </div>
              <Badge className={cn("font-normal", getStatusColor(mockJob.status))}>{mockJob.status}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockJob.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Platform</p>
                  <p className="font-medium">{mockJob.platform}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resource Category</p>
                  <Badge className={cn("font-normal mt-1", getCategoryColor(mockJob.resourceCategory))}>
                    {mockJob.resourceCategory}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <Badge className={cn("font-normal mt-1", getPaymentStatusColor(mockJob.paymentStatus))}>
                    {mockJob.paymentStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Amount</p>
                  <p className="font-medium">${mockJob.paymentAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p className="font-medium">{new Date(mockJob.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{new Date(mockJob.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Assigned Resource</p>
                {mockJob.resourceId ? (
                  <Link href={`/type-b-resources/${mockJob.resourceId}`} className="text-primary hover:underline">
                    {mockJob.resourceId}
                  </Link>
                ) : (
                  <p className="text-muted-foreground">No resource assigned yet</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/module2-jobs/${params.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
              {getActionButton(mockJob.status)}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Timeline</CardTitle>
              <CardDescription>History of actions performed on this job</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourceTimeline timeline={mockJob.timeline} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Actions</CardTitle>
              <CardDescription>Available actions for this job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-md bg-muted">
                <h3 className="font-medium">Current: {mockJob.status}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockJob.status === "Unassigned"
                    ? "This job needs a resource to be assigned."
                    : mockJob.status === "Resource Selected"
                      ? "Resource has been selected but processing has not started."
                      : mockJob.status === "In Progress"
                        ? "Job is currently being processed."
                        : "Job has been completed."}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Next Action</h3>
                {getActionButton(mockJob.status)}

                {mockJob.paymentStatus === "Pending" && (
                  <Button variant="outline" className="w-full mt-2">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Verify Payment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>Payment and commission information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Amount:</span>
                  <span className="font-medium">${mockJob.paymentAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee (10%):</span>
                  <span className="font-medium">${(mockJob.paymentAmount * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operator Commission (15%):</span>
                  <span className="font-medium">${(mockJob.paymentAmount * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resource Usage Fee:</span>
                  <span className="font-medium">${(mockJob.paymentAmount * 0.25).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Net Profit:</span>
                  <span>${(mockJob.paymentAmount * 0.5).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

