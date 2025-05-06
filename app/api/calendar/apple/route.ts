import { type NextRequest, NextResponse } from "next/server"
import { generateIcsFileContent, type LessonDetails } from "@/lib/calendar-service"

export async function POST(request: NextRequest) {
  try {
    const lessonDetails: LessonDetails = await request.json()

    // Generate ICS file content
    const icsContent = generateIcsFileContent(lessonDetails)

    // Return the ICS content with appropriate headers
    return new NextResponse(icsContent, {
      headers: {
        "Content-Type": "text/calendar",
        "Content-Disposition": `attachment; filename="suri-lesson-${lessonDetails.id}.ics"`,
      },
    })
  } catch (error) {
    console.error("Error generating Apple Calendar event:", error)
    return NextResponse.json({ error: "Failed to generate Apple Calendar event" }, { status: 500 })
  }
}

