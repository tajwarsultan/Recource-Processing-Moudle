"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, ArrowRightCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data for resources
const mockResources = [
  {
    id: "RES-001",
    name: "Resource A",
    type: "Type A",
    status: "Ready",
    createdAt: "2023-04-01",
    updatedAt: "2023-04-05",
  },
  {
    id: "RES-002",
    name: "Resource B",
    type: "Type A",
    status: "In Prep (Step 2)",
    createdAt: "2023-04-02",
    updatedAt: "2023-04-06",
  },
  {
    id: "RES-003",
    name: "Resource C",
    type: "Type A",
    status: "In Prep (Step 1)",
    createdAt: "2023-04-03",
    updatedAt: "2023-04-07",
  },
  {
    id: "RES-004",
    name: "Resource D",
    type: "Type A",
    status: "New",
    createdAt: "2023-04-04",
    updatedAt: "2023-04-04",
  },
  {
    id: "RES-005",
    name: "Resource E",
    type: "Type A",
    status: "Ready",
    createdAt: "2023-04-05",
    updatedAt: "2023-04-08",
  },
  {
    id: "RES-006",
    name: "Resource F",
    type: "Type A",
    status: "In Prep (Step 2)",
    createdAt: "2023-04-06",
    updatedAt: "2023-04-09",
  },
  {
    id: "RES-007",
    name: "Resource G",
    type: "Type A",
    status: "Ready",
    createdAt: "2023-04-07",
    updatedAt: "2023-04-10",
  },
]

type ResourcesTableProps = {
  status?: string
}

export function ResourcesTable({ status }: ResourcesTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("updatedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter resources by status if provided
  const filteredResources = status ? mockResources.filter((resource) => resource.status === status) : mockResources

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

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
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Name
                <ArrowUpDown size={14} />
              </Button>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("updatedAt")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Last Updated
                <ArrowUpDown size={14} />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.id}</TableCell>
              <TableCell>{resource.name}</TableCell>
              <TableCell>{resource.type}</TableCell>
              <TableCell>
                <Badge className={cn("font-normal", getStatusColor(resource.status))}>{resource.status}</Badge>
              </TableCell>
              <TableCell>{resource.updatedAt}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/resources/${resource.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/resources/${resource.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Resource
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ArrowRightCircle className="mr-2 h-4 w-4" />
                      {getNextAction(resource.status)}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

