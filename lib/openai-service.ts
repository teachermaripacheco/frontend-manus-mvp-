import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Types for our chat messages
export interface ChatMessage {
  id: string
  sender: "user" | "ai"
  message: string
  timestamp: Date
  type: "text" | "audio" | "video" | "system"
  attachments?: string[]
}

// Function to generate a response from OpenAI
export async function generateAIResponse(
  messages: ChatMessage[],
  mode: "chat" | "therapy" | "coaching" | "neuroscience" = "chat",
): Promise<string> {
  // Convert our messages to the format expected by OpenAI
  const formattedMessages = messages.map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.message,
  }))

  // Create a system message based on the mode
  let systemMessage = "You are SURI, an AI language learning assistant."

  switch (mode) {
    case "therapy":
      systemMessage =
        "You are SURI, an AI language learning assistant with expertise in psychology. Help the user with emotional challenges related to language learning. Be empathetic, supportive, and provide evidence-based psychological insights. Never diagnose medical conditions or replace professional mental health care."
      break
    case "coaching":
      systemMessage =
        "You are SURI, an AI language learning coach. Help the user set and achieve their language learning goals. Be motivational, practical, and provide actionable advice. Focus on accountability and progress tracking."
      break
    case "neuroscience":
      systemMessage =
        "You are SURI, an AI language learning assistant with expertise in neuroscience. Explain how the brain processes language and provide science-backed techniques for effective learning. Use clear, accessible language while maintaining scientific accuracy."
      break
  }

  try {
    // Generate a response using the AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: formattedMessages[formattedMessages.length - 1].content,
      system: systemMessage,
    })

    return text
  } catch (error) {
    console.error("Error generating AI response:", error)
    return "I'm sorry, I encountered an error processing your request. Please try again."
  }
}

// Function to stream a response from OpenAI
export function streamAIResponse(
  messages: ChatMessage[],
  mode: "chat" | "therapy" | "coaching" | "neuroscience" = "chat",
  onChunk: (chunk: string) => void,
  onFinish: (fullText: string) => void,
) {
  // Convert our messages to the format expected by OpenAI
  const formattedMessages = messages.map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.message,
  }))

  // Create a system message based on the mode
  let systemMessage = "You are SURI, an AI language learning assistant."

  switch (mode) {
    case "therapy":
      systemMessage =
        "You are SURI, an AI language learning assistant with expertise in psychology. Help the user with emotional challenges related to language learning. Be empathetic, supportive, and provide evidence-based psychological insights. Never diagnose medical conditions or replace professional mental health care."
      break
    case "coaching":
      systemMessage =
        "You are SURI, an AI language learning coach. Help the user set and achieve their language learning goals. Be motivational, practical, and provide actionable advice. Focus on accountability and progress tracking."
      break
    case "neuroscience":
      systemMessage =
        "You are SURI, an AI language learning assistant with expertise in neuroscience. Explain how the brain processes language and provide science-backed techniques for effective learning. Use clear, accessible language while maintaining scientific accuracy."
      break
  }

  try {
    // Stream a response using the AI SDK
    const result = streamText({
      model: openai("gpt-4o"),
      prompt: formattedMessages[formattedMessages.length - 1].content,
      system: systemMessage,
      onChunk: ({ chunk }) => {
        if (chunk.type === "text-delta") {
          onChunk(chunk.text)
        }
      },
    })

    result.text.then((fullText) => {
      onFinish(fullText)
    })

    return result
  } catch (error) {
    console.error("Error streaming AI response:", error)
    onChunk("I'm sorry, I encountered an error processing your request. Please try again.")
    onFinish("I'm sorry, I encountered an error processing your request. Please try again.")
    return null
  }
}

