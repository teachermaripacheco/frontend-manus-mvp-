import { NextResponse } from "next/server"
import { getAdaptiveModel, updateAdaptiveModel } from "@/lib/data-service"

export async function GET() {
  try {
    const model = await getAdaptiveModel()
    return NextResponse.json(model)
  } catch (error) {
    console.error("Error fetching adaptive model:", error)
    return NextResponse.json({ error: "Failed to fetch adaptive model" }, { status: 500 })
  }
}

export async function PUT() {
  try {
    const updatedModel = await updateAdaptiveModel()
    return NextResponse.json(updatedModel)
  } catch (error) {
    console.error("Error updating adaptive model:", error)
    return NextResponse.json({ error: "Failed to update adaptive model" }, { status: 500 })
  }
}

