import { NextResponse } from "next/server"
import { getWeeklyInsights, generateWeeklyInsights } from "@/lib/data-service"

export async function GET() {
  try {
    const insights = await getWeeklyInsights()
    return NextResponse.json(insights)
  } catch (error) {
    console.error("Error fetching weekly insights:", error)
    return NextResponse.json({ error: "Failed to fetch weekly insights" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const newInsights = await generateWeeklyInsights()
    return NextResponse.json(newInsights)
  } catch (error) {
    console.error("Error generating weekly insights:", error)
    return NextResponse.json({ error: "Failed to generate weekly insights" }, { status: 500 })
  }
}

