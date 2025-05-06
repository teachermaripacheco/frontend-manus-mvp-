import { NextResponse } from "next/server"
import { getProgressData, updateProgressData } from "@/lib/data-service"

export async function GET() {
  try {
    const data = await getProgressData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching progress data:", error)
    return NextResponse.json({ error: "Failed to fetch progress data" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const updatedData = await updateProgressData(data)
    return NextResponse.json(updatedData)
  } catch (error) {
    console.error("Error updating progress data:", error)
    return NextResponse.json({ error: "Failed to update progress data" }, { status: 500 })
  }
}

