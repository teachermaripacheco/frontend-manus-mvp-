import { NextResponse } from "next/server"
import { getLessonFeedback, addLessonFeedback } from "@/lib/data-service"

export async function GET() {
  try {
    const feedback = await getLessonFeedback()
    return NextResponse.json(feedback)
  } catch (error) {
    console.error("Error fetching lesson feedback:", error)
    return NextResponse.json({ error: "Failed to fetch lesson feedback" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newFeedback = await addLessonFeedback(data)
    return NextResponse.json(newFeedback)
  } catch (error) {
    console.error("Error adding lesson feedback:", error)
    return NextResponse.json({ error: "Failed to add lesson feedback" }, { status: 500 })
  }
}

