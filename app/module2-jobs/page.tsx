import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Module2JobsTable } from "@/components/module2-jobs-table"
import Link from "next/link"

export default function Module2JobsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Module 2 Jobs</h1>
        <Button asChild>
          <Link href="/module2-jobs/new">Create New Job</Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
          <TabsTrigger value="resource-selected">Resource Selected</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Module 2 Jobs</CardTitle>
              <CardDescription>Manage all jobs with unassigned resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Module2JobsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unassigned">
          <Card>
            <CardHeader>
              <CardTitle>Unassigned Jobs</CardTitle>
              <CardDescription>Jobs awaiting resource selection</CardDescription>
            </CardHeader>
            <CardContent>
              <Module2JobsTable status="Unassigned" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resource-selected">
          <Card>
            <CardHeader>
              <CardTitle>Resource Selected Jobs</CardTitle>
              <CardDescription>Jobs with resources selected but not yet in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Module2JobsTable status="Resource Selected" />
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
              <Module2JobsTable status="In Progress" />
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
              <Module2JobsTable status="Completed" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

