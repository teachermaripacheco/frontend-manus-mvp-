import { NextResponse } from "next/server"
import { getTheTalkData, updateTheTalkData } from "@/lib/data-service"

export async function GET() {
  try {
    const data = await getTheTalkData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching The Talk data:", error)
    return NextResponse.json({ error: "Failed to fetch The Talk data" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const updatedData = await updateTheTalkData(data)
    return NextResponse.json(updatedData)
  } catch (error) {
    console.error("Error updating The Talk data:", error)
    return NextResponse.json({ error: "Failed to update The Talk data" }, { status: 500 })
  }
}

