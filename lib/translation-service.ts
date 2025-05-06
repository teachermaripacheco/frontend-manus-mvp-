import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Translation cache to avoid redundant API calls
const translationCache: Record<string, Record<string, string>> = {}

/**
 * Translates text using server-side API route
 */
async function translateWithServer(text: string, targetLanguage: string): Promise<string> {
  try {
    // Don't translate if target language is English
    if (targetLanguage === "English") {
      return text
    }

    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, targetLanguage }),
    })

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.translatedText
  } catch (error) {
    console.error("Error translating with server:", error)
    return text
  }
}

/**
 * Translates text using OpenAI
 */
async function translateWithOpenAI(text: string, targetLanguage: string): Promise<string> {
  try {
    // For complex or longer text, use OpenAI for better quality translations
    const { text: translatedText } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Translate the following text from English to ${targetLanguage}. Maintain the original formatting, tone, and meaning as closely as possible:\n\n${text}`,
      system:
        "You are a professional translator. Provide accurate translations while preserving the original meaning, tone, and formatting.",
    })

    return translatedText
  } catch (error) {
    console.error("Error translating with OpenAI:", error)
    return text
  }
}

/**
 * Determines whether to use server-side Google Translate or OpenAI based on text complexity
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  // Check cache first
  if (translationCache[targetLanguage]?.[text]) {
    return translationCache[targetLanguage][text]
  }

  // Don't translate if targetLanguage is English
  if (targetLanguage === "English") {
    return text
  }

  let translatedText: string

  // Use OpenAI for longer or more complex text
  if (text.length > 100 || text.includes("```") || /[<>{}]/.test(text)) {
    translatedText = await translateWithOpenAI(text, targetLanguage)
  } else {
    // Use server-side Google Translate for shorter, simpler text
    translatedText = await translateWithServer(text, targetLanguage)
  }

  // Update cache
  if (!translationCache[targetLanguage]) {
    translationCache[targetLanguage] = {}
  }
  translationCache[targetLanguage][text] = translatedText

  return translatedText
}

/**
 * Returns a list of available languages
 */
export function getAvailableLanguages(): { name: string; nativeName: string; code: string }[] {
  return [
    { name: "English", nativeName: "English", code: "en" },
    { name: "Spanish", nativeName: "Español", code: "es" },
    { name: "French", nativeName: "Français", code: "fr" },
    { name: "German", nativeName: "Deutsch", code: "de" },
    { name: "Chinese", nativeName: "中文", code: "zh" },
    { name: "Japanese", nativeName: "日本語", code: "ja" },
    { name: "Arabic", nativeName: "العربية", code: "ar" },
    { name: "Russian", nativeName: "Русский", code: "ru" },
    { name: "Portuguese", nativeName: "Português", code: "pt" },
    { name: "Hindi", nativeName: "हिन्दी", code: "hi" },
    { name: "Italian", nativeName: "Italiano", code: "it" },
    { name: "Dutch", nativeName: "Nederlands", code: "nl" },
    { name: "Korean", nativeName: "한국어", code: "ko" },
    { name: "Turkish", nativeName: "Türkçe", code: "tr" },
    { name: "Polish", nativeName: "Polski", code: "pl" },
    { name: "Swedish", nativeName: "Svenska", code: "sv" },
  ]
}

export const translationService = {
  translateText,
  getAvailableLanguages,
}

