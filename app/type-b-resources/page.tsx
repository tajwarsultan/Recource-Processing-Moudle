import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TypeBResourcesTable } from "@/components/type-b-resources-table"
import Link from "next/link"

export default function TypeBResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Type B Resources</h1>
        <Button asChild>
          <Link href="/type-b-resources/new">Add New Resource</Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="in-use">In Use</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Type B Resources</CardTitle>
              <CardDescription>Manage all Type B digital resources</CardDescription>
            </CardHeader>
            <CardContent>
              <TypeBResourcesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Available Resources</CardTitle>
              <CardDescription>Resources available for assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <TypeBResourcesTable status="Available" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-use">
          <Card>
            <CardHeader>
              <CardTitle>In Use Resources</CardTitle>
              <CardDescription>Resources currently assigned to jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <TypeBResourcesTable status="In Use" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Resources</CardTitle>
              <CardDescription>Resources undergoing maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <TypeBResourcesTable status="Maintenance" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

