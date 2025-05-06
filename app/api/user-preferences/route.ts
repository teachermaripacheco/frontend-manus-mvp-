import { NextResponse } from "next/server"
import { getUserPreferences, updateUserPreferences } from "@/lib/data-service"

export async function GET() {
  try {
    const preferences = await getUserPreferences()
    return NextResponse.json(preferences)
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return NextResponse.json({ error: "Failed to fetch user preferences" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const updatedPreferences = await updateUserPreferences(data)
    return NextResponse.json(updatedPreferences)
  } catch (error) {
    console.error("Error updating user preferences:", error)
    return NextResponse.json({ error: "Failed to update user preferences" }, { status: 500 })
  }
}

