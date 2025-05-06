import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json()

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Get language code
    const languageCode = getLanguageCode(targetLanguage)

    // Use Google Translate API
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Translation service not configured" }, { status: 500 })
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: languageCode,
        format: "text",
      }),
    })

    const data = await response.json()

    if (data.error) {
      console.error("Google Translate API error:", data.error)
      return NextResponse.json({ error: "Translation failed" }, { status: 500 })
    }

    return NextResponse.json({
      translatedText: data.data.translations[0].translatedText,
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}

function getLanguageCode(language: string): string {
  const languageCodes: Record<string, string> = {
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
    Chinese: "zh",
    Japanese: "ja",
    Arabic: "ar",
    Russian: "ru",
    Portuguese: "pt",
    Hindi: "hi",
    Italian: "it",
    Dutch: "nl",
    Korean: "ko",
    Turkish: "tr",
    Polish: "pl",
    Swedish: "sv",
  }

  return languageCodes[language] || "en"
}

