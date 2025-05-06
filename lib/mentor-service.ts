import { OpenAIStream } from "ai"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export type UserProfile = {
  name: string
  level: string
  learningGoals: string[]
  strengths: string[]
  weaknesses: string[]
  discProfile?: {
    dominant: number
    influential: number
    steady: number
    compliant: number
    primaryType: "D" | "I" | "S" | "C"
  }
  talkData?: {
    communicationStyle: string
    preferredFeedbackMethod: string
    motivationFactors: string[]
  }
}

// Mock user profile - in a real app, this would come from a database
const mockUserProfile: UserProfile = {
  name: "Alex",
  level: "Intermediate",
  learningGoals: ["Business English", "Fluent conversation", "Technical vocabulary"],
  strengths: ["Good reading comprehension", "Strong vocabulary"],
  weaknesses: ["Grammar mistakes", "Pronunciation of certain sounds"],
  discProfile: {
    dominant: 30,
    influential: 65,
    steady: 45,
    compliant: 40,
    primaryType: "I",
  },
  talkData: {
    communicationStyle: "Visual and interactive",
    preferredFeedbackMethod: "Positive reinforcement with gentle correction",
    motivationFactors: ["Career advancement", "Travel opportunities", "Personal growth"],
  },
}

// Function to get user profile - would connect to DB in production
export async function getUserProfile(userId: string): Promise<UserProfile> {
  // In a real app, fetch from database
  return mockUserProfile
}

// Generate system prompt based on user profile
function generateSystemPrompt(profile: UserProfile): string {
  let toneGuidance = ""

  // Adjust tone based on DISC profile
  if (profile.discProfile) {
    if (profile.discProfile.primaryType === "D") {
      toneGuidance = "Be direct, concise, and results-oriented. Focus on achievements and progress."
    } else if (profile.discProfile.primaryType === "I") {
      toneGuidance =
        "Be enthusiastic, friendly, and encouraging. Use positive language and focus on social aspects of learning."
    } else if (profile.discProfile.primaryType === "S") {
      toneGuidance = "Be patient, supportive, and methodical. Provide step-by-step guidance and reassurance."
    } else if (profile.discProfile.primaryType === "C") {
      toneGuidance = "Be precise, logical, and detail-oriented. Provide accurate information and clear explanations."
    }
  }

  // Incorporate The Talk data
  if (profile.talkData) {
    toneGuidance += ` Communicate in a ${profile.talkData.communicationStyle} way. Provide feedback using ${profile.talkData.preferredFeedbackMethod}.`
  }

  return `
You are a supportive language learning mentor for ${profile.name}, who is at a ${profile.level} level of English.

${toneGuidance}

Their learning goals include: ${profile.learningGoals.join(", ")}.
Their strengths include: ${profile.strengths.join(", ")}.
Areas they need to work on: ${profile.weaknesses.join(", ")}.
They are motivated by: ${profile.talkData?.motivationFactors.join(", ") || "improving their English"}.

As their mentor:
1. Provide encouragement based on their progress and learning style
2. Answer language questions clearly and at their level
3. Suggest specific exercises that target their weak areas
4. Recognize their strengths and build upon them
5. Keep responses concise (2-4 sentences) unless a detailed explanation is needed
6. Occasionally remind them of their progress to maintain motivation

Your responses should feel personalized, supportive, and tailored to their specific needs and communication preferences.
`
}

// Function to generate mentor response
export async function generateMentorResponse(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  userId: string,
) {
  try {
    const userProfile = await getUserProfile(userId)
    const systemPrompt = generateSystemPrompt(userProfile)

    // Add system message at the beginning if not present
    if (messages.length === 0 || messages[0].role !== "system") {
      messages.unshift({ role: "system", content: systemPrompt })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    })

    return OpenAIStream(response)
  } catch (error) {
    console.error("Error generating mentor response:", error)
    throw error
  }
}

// Generate quick reply suggestions based on conversation context
export async function generateQuickReplies(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  userId: string,
) {
  try {
    const userProfile = await getUserProfile(userId)

    // Get the last message from the assistant to generate contextual quick replies
    const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant")?.content || ""

    const prompt = `
Based on this conversation with a language learning student, generate 3-4 short, natural quick reply options that the student might want to use next. Each reply should be 1-7 words maximum. Format as a JSON array of strings.

Student profile:
- Level: ${userProfile.level}
- Learning goals: ${userProfile.learningGoals.join(", ")}

Last message from mentor: "${lastAssistantMessage}"

Return ONLY a valid JSON array of strings like this: ["Quick reply 1", "Quick reply 2", "Quick reply 3"]
`

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150,
      response_format: { type: "json_object" },
    })

    const content = response.choices[0].message.content
    if (!content) return ["Can you explain more?", "Thank you!", "I need help with grammar"]

    try {
      const parsed = JSON.parse(content)
      return parsed.replies || ["Can you explain more?", "Thank you!", "I need help with grammar"]
    } catch (e) {
      console.error("Failed to parse quick replies JSON:", e)
      return ["Can you explain more?", "Thank you!", "I need help with grammar"]
    }
  } catch (error) {
    console.error("Error generating quick replies:", error)
    return ["Can you explain more?", "Thank you!", "I need help with grammar"]
  }
}

