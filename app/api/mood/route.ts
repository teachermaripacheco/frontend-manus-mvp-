import { NextResponse } from "next/server"
import { getMoodEntries, addMoodEntry } from "@/lib/data-service"

export async function GET() {
  try {
    const entries = await getMoodEntries()
    return NextResponse.json(entries)
  } catch (error) {
    console.error("Error fetching mood entries:", error)
    return NextResponse.json({ error: "Failed to fetch mood entries" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newEntry = await addMoodEntry(data)
    return NextResponse.json(newEntry)
  } catch (error) {
    console.error("Error adding mood entry:", error)
    return NextResponse.json({ error: "Failed to add mood entry" }, { status: 500 })
  }
}

