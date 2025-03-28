import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Module2Dashboard } from "@/components/module2-dashboard"
import { Module2JobsTable } from "@/components/module2-jobs-table"
import Link from "next/link"

export default function Module2DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Module 2 Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/type-b-resources/new">Add Resource</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/module2-jobs/new">Create Job</Link>
          </Button>
        </div>
      </div>

      <Module2Dashboard />

      <Card>
        <CardHeader>
          <CardTitle>Unassigned Jobs</CardTitle>
          <CardDescription>Jobs waiting for resource assignment</CardDescription>
        </CardHeader>
        <CardContent>
          <Module2JobsTable status="Unassigned" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Management</CardTitle>
            <CardDescription>Manage Type B resources</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>
              Type B resources are used for Module 2 job processing. These resources are selected from a pool during job
              processing.
            </p>
            <Button asChild>
              <Link href="/type-b-resources">View All Resources</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Management</CardTitle>
            <CardDescription>Manage Module 2 jobs</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>Module 2 jobs require operators to select resources from the available pool during processing.</p>
            <Button asChild>
              <Link href="/module2-jobs">View All Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

