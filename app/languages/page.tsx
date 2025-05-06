"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/contexts/translation-context"
import { translationService } from "@/lib/translation-service"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LanguagesPage() {
  const { currentLanguage, setLanguage, translate } = useTranslation()
  const [languages, setLanguages] = useState<{ code: string; name: string; nativeName: string }[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchLanguages = async () => {
      const availableLanguages = await translationService.getAvailableLanguages()
      setLanguages(availableLanguages)
    }

    fetchLanguages()
  }, [])

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-suri-blue hover:underline mb-8 inline-block">
          ← {translate("Back to Home")}
        </Link>

        <h1 className="text-3xl font-bold mb-6">{translate("Select Your Language")}</h1>

        <div className="mb-8">
          <Input
            type="text"
            placeholder={translate("Search languages...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredLanguages.map((lang) => (
            <Card
              key={lang.code}
              className={`cursor-pointer hover:border-suri-blue/50 transition-colors ${
                currentLanguage === lang.name ? "border-suri-blue bg-suri-blue/5" : ""
              }`}
              onClick={() => setLanguage(lang.name)}
            >
              <CardContent className="p-4">
                <div className="font-medium">{lang.name}</div>
                <div className="text-sm text-muted-foreground">{lang.nativeName}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

