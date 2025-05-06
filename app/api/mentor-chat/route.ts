import { generateMentorResponse } from "@/lib/mentor-service"
import type { NextRequest } from "next/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { messages, userId } = await req.json()

    // Validate request
    if (!messages || !Array.isArray(messages) || !userId) {
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Generate streaming response
    const stream = await generateMentorResponse(messages, userId)

    return new Response(stream)
  } catch (error) {
    console.error("Error in mentor chat API:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

