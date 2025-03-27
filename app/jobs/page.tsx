import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobsTable } from "@/components/jobs-table"
import Link from "next/link"

export default function JobsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Jobs Management</h1>
        <Button asChild>
          <Link href="/jobs/new">Create New Job</Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="payment-verified">Payment Verified</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Jobs</CardTitle>
              <CardDescription>Manage all customer jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <JobsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Jobs</CardTitle>
              <CardDescription>Recently created jobs awaiting processing</CardDescription>
            </CardHeader>
            <CardContent>
              <JobsTable status="New" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Jobs</CardTitle>
              <CardDescription>Jobs currently being processed</CardDescription>
            </CardHeader>
            <CardContent>
              <JobsTable status="In Progress" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-verified">
          <Card>
            <CardHeader>
              <CardTitle>Payment Verified Jobs</CardTitle>
              <CardDescription>Jobs with verified payments</CardDescription>
            </CardHeader>
            <CardContent>
              <JobsTable status="Payment Verified" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Jobs</CardTitle>
              <CardDescription>Successfully completed jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <JobsTable status="Completed" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

