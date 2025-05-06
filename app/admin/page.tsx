"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for users
const mockUsers = [
  {
    id: "user1",
    name: "Alice Wonderland",
    email: "alice@example.com",
    registrationDate: "2024-05-01",
    planStatus: "Active",
    lastFeedbackRating: 4,
  },
  {
    id: "user2",
    name: "Bob The Builder",
    email: "bob@example.com",
    registrationDate: "2024-05-03",
    planStatus: "Pending Input",
    lastFeedbackRating: null,
  },
  {
    id: "user3",
    name: "Charlie Chaplin",
    email: "charlie@example.com",
    registrationDate: "2024-04-28",
    planStatus: "Active",
    lastFeedbackRating: 5,
  },
];

export default function AdminPage() {
  const [users, setUsers] = useState<typeof mockUsers | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data from the backend
    // --- TODO: Replace with actual API call to fetch users --- 
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        // const response = await fetch("/api/admin/users"); // Replace with actual backend endpoint
        // if (!response.ok) throw new Error("Failed to fetch users");
        // const data = await response.json();
        // setUsers(data);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(mockUsers); // Use mock data for now
      } catch (error) {
        console.error("Error fetching users:", error)
        // Handle error display
      } finally {
        setIsLoading(false)
      }
    }
    // --- End TODO ---
    fetchUsers()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading user data...</span>
        </div>
      </div>
    )
  }

  if (!users) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4">
        <p className="text-red-500">Failed to load user data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Admin Dashboard</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Overview of registered users and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Plan Status</TableHead>
                <TableHead>Last Feedback</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                  <TableCell>
                    <Badge variant={user.planStatus === "Active" ? "default" : "secondary"}
                           className={user.planStatus === "Active" ? "bg-green-500 text-white" : ""}>
                      {user.planStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.lastFeedbackRating ? `${user.lastFeedbackRating}/5` : "N/A"}
                  </TableCell>
                  <TableCell>
                    {/* TODO: Link to a detailed user view page */}
                    <Link href={`/admin/users/${user.id}`} passHref>
                       <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

