import type { Metadata } from "next"
import { StudentDashboard } from "@/components/student-dashboard"

export const metadata: Metadata = {
  title: "Dashboard | SURI AI",
  description: "Your personalized language learning dashboard",
}

export default function DashboardPage() {
  return <StudentDashboard />
}

