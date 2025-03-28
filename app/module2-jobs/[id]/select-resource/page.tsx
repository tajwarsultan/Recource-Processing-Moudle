"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock job data
const mockJob = {
  id: "JOB-2003",
  name: "Module 2 Request C",
  platform: "Platform X",
  description: "This is a sample Module 2 job that requires a Type B resource.",
  paymentStatus: "Verified",
  paymentAmount: 420.0,
  resourceCategory: "Premium",
  status: "Unassigned",
  createdAt: "2023-04-03",
  updatedAt: "2023-04-07",
}

// Mock available resources
const mockAvailableResources = [
  {
    id: "RESB-001",
    name: "Type B Resource 1",
    category: "Premium",
    status: "Available",
    usageCount: 0,
  },
  {
    id: "RESB-003",
    name: "Type B Resource 3",
    category: "Premium",
    status: "Available",
    usageCount: 1,
  },
  {
    id: "RESB-005",
    name: "Type B Resource 5",
    category: "Premium",
    status: "Available",
    usageCount: 2,
  },
  {
    id: "RESB-007",
    name: "Type B Resource 7",
    category: "Premium",
    status: "Available",
    usageCount: 3,
  },
]

export default function SelectResourcePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedResource, setSelectedResource] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelectResource = (resourceId: string) => {
    setSelectedResource(resourceId)
  }

  const handleSubmit = () => {
    if (!selectedResource) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Resource Assigned",
        description: `Resource ${selectedResource} has been assigned to job ${params.id}.`,
      })
      router.push(`/module2-jobs/${params.id}`)
    }, 1000)
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/module2-jobs/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Select Resource for Job</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Select a resource for this job</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{mockJob.name}</h3>
              <p className="text-sm text-muted-foreground">{mockJob.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="font-medium">{mockJob.platform}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 font-normal">
                    {mockJob.paymentStatus}
                  </Badge>
                  <span>${mockJob.paymentAmount.toFixed(2)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resource Category Required</p>
                <Badge className={cn("font-normal", getCategoryColor(mockJob.resourceCategory))}>
                  {mockJob.resourceCategory}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created On</p>
                <p className="font-medium">{mockJob.createdAt}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="mt-1">{mockJob.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Resources</CardTitle>
          <CardDescription>Select a resource to assign to this job</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAvailableResources.map((resource) => (
              <div
                key={resource.id}
                className={cn(
                  "p-4 border rounded-md cursor-pointer transition-colors",
                  selectedResource === resource.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/20 hover:bg-muted/50",
                )}
                onClick={() => handleSelectResource(resource.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn("font-normal", getCategoryColor(resource.category))}>
                      {resource.category}
                    </Badge>
                    {selectedResource === resource.id && <CheckCircle className="h-5 w-5 text-primary" />}
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Usage Count: </span>
                  <span>{resource.usageCount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push(`/module2-jobs/${params.id}`)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedResource || isSubmitting}>
            {isSubmitting ? "Assigning..." : "Assign Resource"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

