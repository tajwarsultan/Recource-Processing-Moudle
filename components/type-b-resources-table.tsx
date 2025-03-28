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
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, PenToolIcon as Tool, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data for Type B resources
const mockResources = [
  {
    id: "RESB-001",
    name: "Type B Resource 1",
    category: "Premium",
    status: "Available",
    lastUsed: "Never",
    usageCount: 0,
    createdAt: "2023-04-01",
    updatedAt: "2023-04-01",
  },
  {
    id: "RESB-002",
    name: "Type B Resource 2",
    category: "Standard",
    status: "In Use",
    lastUsed: "2023-04-10",
    usageCount: 3,
    createdAt: "2023-04-02",
    updatedAt: "2023-04-10",
  },
  {
    id: "RESB-003",
    name: "Type B Resource 3",
    category: "Premium",
    status: "Available",
    lastUsed: "2023-04-05",
    usageCount: 1,
    createdAt: "2023-04-03",
    updatedAt: "2023-04-05",
  },
  {
    id: "RESB-004",
    name: "Type B Resource 4",
    category: "Standard",
    status: "Maintenance",
    lastUsed: "2023-04-08",
    usageCount: 5,
    createdAt: "2023-04-04",
    updatedAt: "2023-04-09",
  },
  {
    id: "RESB-005",
    name: "Type B Resource 5",
    category: "Premium",
    status: "Available",
    lastUsed: "2023-04-07",
    usageCount: 2,
    createdAt: "2023-04-05",
    updatedAt: "2023-04-07",
  },
  {
    id: "RESB-006",
    name: "Type B Resource 6",
    category: "Standard",
    status: "In Use",
    lastUsed: "2023-04-10",
    usageCount: 4,
    createdAt: "2023-04-06",
    updatedAt: "2023-04-10",
  },
  {
    id: "RESB-007",
    name: "Type B Resource 7",
    category: "Premium",
    status: "Available",
    lastUsed: "2023-04-09",
    usageCount: 3,
    createdAt: "2023-04-07",
    updatedAt: "2023-04-09",
  },
]

type TypeBResourcesTableProps = {
  status?: string
}

export function TypeBResourcesTable({ status }: TypeBResourcesTableProps) {
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
      case "Available":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "In Use":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      case "Maintenance":
        return "bg-orange-500/20 text-orange-700 dark:text-orange-400"
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
      case "Available":
        return "Assign to Job"
      case "In Use":
        return "View Current Job"
      case "Maintenance":
        return "Mark as Available"
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
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("usageCount")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Usage Count
                <ArrowUpDown size={14} />
              </Button>
            </TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.id}</TableCell>
              <TableCell>{resource.name}</TableCell>
              <TableCell>
                <Badge className={cn("font-normal", getCategoryColor(resource.category))}>{resource.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn("font-normal", getStatusColor(resource.status))}>{resource.status}</Badge>
              </TableCell>
              <TableCell>{resource.usageCount}</TableCell>
              <TableCell>{resource.lastUsed}</TableCell>
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
                      <Link href={`/type-b-resources/${resource.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/type-b-resources/${resource.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Resource
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {resource.status === "Available" && (
                      <DropdownMenuItem asChild>
                        <Link href="/module2-jobs/new">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Assign to Job
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {resource.status === "In Use" && (
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Current Job
                      </DropdownMenuItem>
                    )}
                    {resource.status === "Maintenance" && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Available
                      </DropdownMenuItem>
                    )}
                    {resource.status !== "Maintenance" && (
                      <DropdownMenuItem>
                        <Tool className="mr-2 h-4 w-4" />
                        Send to Maintenance
                      </DropdownMenuItem>
                    )}
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

