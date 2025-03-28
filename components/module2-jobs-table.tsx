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
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, ArrowRightCircle, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data for Module 2 jobs
const mockJobs = [
  {
    id: "JOB-2001",
    name: "Module 2 Request A",
    platform: "Platform X",
    resourceId: "RESB-003",
    status: "Completed",
    paymentStatus: "Verified",
    paymentAmount: 350.0,
    createdAt: "2023-04-01",
    updatedAt: "2023-04-05",
  },
  {
    id: "JOB-2002",
    name: "Module 2 Request B",
    platform: "Platform Y",
    resourceId: "RESB-002",
    status: "In Progress",
    paymentStatus: "Verified",
    paymentAmount: 275.5,
    createdAt: "2023-04-02",
    updatedAt: "2023-04-06",
  },
  {
    id: "JOB-2003",
    name: "Module 2 Request C",
    platform: "Platform X",
    resourceId: null,
    status: "Unassigned",
    paymentStatus: "Verified",
    paymentAmount: 420.0,
    createdAt: "2023-04-03",
    updatedAt: "2023-04-07",
  },
  {
    id: "JOB-2004",
    name: "Module 2 Request D",
    platform: "Platform Z",
    resourceId: null,
    status: "Unassigned",
    paymentStatus: "Pending",
    paymentAmount: 250.0,
    createdAt: "2023-04-04",
    updatedAt: "2023-04-04",
  },
  {
    id: "JOB-2005",
    name: "Module 2 Request E",
    platform: "Platform X",
    resourceId: "RESB-006",
    status: "In Progress",
    paymentStatus: "Verified",
    paymentAmount: 300.0,
    createdAt: "2023-04-05",
    updatedAt: "2023-04-08",
  },
  {
    id: "JOB-2006",
    name: "Module 2 Request F",
    platform: "Platform Y",
    resourceId: "RESB-001",
    status: "Resource Selected",
    paymentStatus: "Verified",
    paymentAmount: 375.0,
    createdAt: "2023-04-06",
    updatedAt: "2023-04-09",
  },
]

type Module2JobsTableProps = {
  status?: string
}

export function Module2JobsTable({ status }: Module2JobsTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("updatedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter jobs by status if provided
  const filteredJobs = status ? mockJobs.filter((job) => job.status === status) : mockJobs

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
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
            <TableHead>Platform</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Resource</TableHead>
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
          {sortedJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.id}</TableCell>
              <TableCell>{job.name}</TableCell>
              <TableCell>{job.platform}</TableCell>
              <TableCell>
                <Badge className={cn("font-normal", getStatusColor(job.status))}>{job.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge className={cn("font-normal", getPaymentStatusColor(job.paymentStatus))}>
                    {job.paymentStatus}
                  </Badge>
                  <span>${job.paymentAmount.toFixed(2)}</span>
                </div>
              </TableCell>
              <TableCell>
                {job.resourceId ? (
                  <Link href={`/type-b-resources/${job.resourceId}`} className="text-primary hover:underline">
                    {job.resourceId}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">Not assigned</span>
                )}
              </TableCell>
              <TableCell>{job.updatedAt}</TableCell>
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
                      <Link href={`/module2-jobs/${job.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/module2-jobs/${job.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Job
                      </Link>
                    </DropdownMenuItem>
                    {job.paymentStatus === "Pending" && (
                      <DropdownMenuItem>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Verify Payment
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {job.status === "Unassigned" && (
                      <DropdownMenuItem asChild>
                        <Link href={`/module2-jobs/${job.id}/select-resource`}>
                          <ArrowRightCircle className="mr-2 h-4 w-4" />
                          Select Resource
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {job.status === "Resource Selected" && (
                      <DropdownMenuItem>
                        <ArrowRightCircle className="mr-2 h-4 w-4" />
                        Start Processing
                      </DropdownMenuItem>
                    )}
                    {job.status === "In Progress" && (
                      <DropdownMenuItem>
                        <ArrowRightCircle className="mr-2 h-4 w-4" />
                        Mark Completed
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

