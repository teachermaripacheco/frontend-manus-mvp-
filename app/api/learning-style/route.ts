import { NextResponse } from "next/server"
import { getLearningStyle, updateLearningStyle } from "@/lib/data-service"

export async function GET() {
  try {
    const style = await getLearningStyle()
    return NextResponse.json(style)
  } catch (error) {
    console.error("Error fetching learning style:", error)
    return NextResponse.json({ error: "Failed to fetch learning style" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const updatedStyle = await updateLearningStyle(data)
    return NextResponse.json(updatedStyle)
  } catch (error) {
    console.error("Error updating learning style:", error)
    return NextResponse.json({ error: "Failed to update learning style" }, { status: 500 })
  }
}

