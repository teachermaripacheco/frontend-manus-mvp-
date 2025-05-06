import { generateQuickReplies } from "@/lib/mentor-service"
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

    // Generate quick replies
    const quickReplies = await generateQuickReplies(messages, userId)

    return new Response(JSON.stringify({ quickReplies }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error generating quick replies:", error)
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        quickReplies: ["Can you explain more?", "Thank you!", "I need help with grammar"],
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

