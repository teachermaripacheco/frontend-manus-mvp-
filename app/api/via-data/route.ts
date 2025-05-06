import { NextResponse } from "next/server"
import { getVIAData, updateVIAData } from "@/lib/data-service"

export async function GET() {
  try {
    const data = await getVIAData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching VIA data:", error)
    return NextResponse.json({ error: "Failed to fetch VIA data" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const updatedData = await updateVIAData(data)
    return NextResponse.json(updatedData)
  } catch (error) {
    console.error("Error updating VIA data:", error)
    return NextResponse.json({ error: "Failed to update VIA data" }, { status: 500 })
  }
}

