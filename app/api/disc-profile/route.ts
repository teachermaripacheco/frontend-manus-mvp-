import { NextResponse } from "next/server"
import { getDISCProfile, updateDISCProfile } from "@/lib/data-service"

export async function GET() {
  try {
    const profile = await getDISCProfile()
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching DISC profile:", error)
    return NextResponse.json({ error: "Failed to fetch DISC profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const updatedProfile = await updateDISCProfile(data)
    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error("Error updating DISC profile:", error)
    return NextResponse.json({ error: "Failed to update DISC profile" }, { status: 500 })
  }
}

