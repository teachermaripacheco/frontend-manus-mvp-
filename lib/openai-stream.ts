import { OpenAIStream as AISDKOpenAIStream } from "ai"
import { StreamingTextResponse } from "ai"
import OpenAI from "openai"

// Initialize the OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function OpenAIStream(prompt: string, options = {}) {
  // Default options
  const defaultOptions = {
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 1000,
  }

  // Merge default options with provided options
  const mergedOptions = { ...defaultOptions, ...options }

  try {
    const response = await openai.chat.completions.create({
      model: mergedOptions.model,
      messages: [{ role: "user", content: prompt }],
      temperature: mergedOptions.temperature,
      max_tokens: mergedOptions.max_tokens,
      stream: true,
    })

    // Create a stream from the response
    const stream = AISDKOpenAIStream(response)

    // Return a StreamingTextResponse which is compatible with the AI SDK
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error in OpenAIStream:", error)
    throw error
  }
}

export default OpenAIStream

