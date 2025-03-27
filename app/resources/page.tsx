import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourcesTable } from "@/components/resources-table"
import Link from "next/link"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Resources Management</h1>
        <Button asChild>
          <Link href="/resources/new">Add New Resource</Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="prep2">In Prep (Step 2)</TabsTrigger>
          <TabsTrigger value="prep1">In Prep (Step 1)</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Resources</CardTitle>
              <CardDescription>Manage all Type A digital resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourcesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ready">
          <Card>
            <CardHeader>
              <CardTitle>Ready Resources</CardTitle>
              <CardDescription>Resources ready to be assigned to jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourcesTable status="Ready" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prep2">
          <Card>
            <CardHeader>
              <CardTitle>In Prep (Step 2) Resources</CardTitle>
              <CardDescription>Resources in the second preparation step</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourcesTable status="In Prep (Step 2)" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prep1">
          <Card>
            <CardHeader>
              <CardTitle>In Prep (Step 1) Resources</CardTitle>
              <CardDescription>Resources in the first preparation step</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourcesTable status="In Prep (Step 1)" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Resources</CardTitle>
              <CardDescription>Newly added resources awaiting preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourcesTable status="New" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

