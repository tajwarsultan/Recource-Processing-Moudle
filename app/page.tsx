import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { RecentJobs } from "@/components/recent-jobs"
import { ResourcesOverview } from "@/components/resources-overview"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/resources/new">Add Resource</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/jobs/new">Create Job</Link>
          </Button>
        </div>
      </div>

      <DashboardMetrics />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Status</CardTitle>
                <CardDescription>Current status of Type A resources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResourcesOverview />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>Latest job activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentJobs />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>All Resources</CardTitle>
              <CardDescription>Manage your Type A resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/resources" className="text-primary hover:underline">
                View all resources
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>All Jobs</CardTitle>
              <CardDescription>Track and manage customer jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/jobs" className="text-primary hover:underline">
                View all jobs
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

