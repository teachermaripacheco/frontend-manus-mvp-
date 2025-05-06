import { NextResponse } from "next/server"
import { getUserProfile, updateUserProfile } from "@/lib/data-service"

export async function GET() {
  try {
    const profile = await getUserProfile()
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const updatedProfile = await updateUserProfile(data)
    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
  }
}

