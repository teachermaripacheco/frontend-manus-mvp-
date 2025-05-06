"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Edit, MessageSquare, Save, Lightbulb } from "lucide-react"

interface JournalEntry {
  id: number
  date: string
  content: string
  language: "native" | "learning"
  mood: string
  tags: string[]
  aiInsights?: string
  wordCount: number
}

export function MicroJournal() {
  const [activeTab, setActiveTab] = useState("write")
  const [journalContent, setJournalContent] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<"native" | "learning">("learning")
  const [selectedMood, setSelectedMood] = useState("neutral")
  const [showMoodPicker, setShowMoodPicker] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      date: "May 28, 2023",
      content:
        "Today I had my first conversation with a native speaker! I was nervous at first, but they were very patient. I struggled with some vocabulary, but managed to express my main ideas. I'm proud of myself for taking this step.",
      language: "learning",
      mood: "proud",
      tags: ["conversation", "milestone"],
      aiInsights:
        "Great job taking this step! I notice you used past tense correctly throughout your entry. Your confidence is growing - keep seeking out these conversation opportunities.",
      wordCount: 42,
    },
    {
      id: 2,
      date: "May 21, 2023",
      content:
        "Estou achando os tempos verbais em inglês muito confusos. Especialmente o present perfect e past simple. Quando devo usar cada um? Preciso praticar mais isso.",
      language: "native",
      mood: "confused",
      tags: ["grammar", "challenge"],
      aiInsights:
        "I see you're struggling with verb tenses. This is a common challenge! In our next lesson, we'll focus specifically on when to use present perfect vs. past simple with clear examples.",
      wordCount: 28,
    },
  ])

  const availableTags = [
    "conversation",
    "grammar",
    "vocabulary",
    "listening",
    "reading",
    "challenge",
    "milestone",
    "question",
    "culture",
    "pronunciation",
  ]

  const moodOptions = [
    { value: "happy", emoji: "😊", label: "Happy" },
    { value: "proud", emoji: "🌟", label: "Proud" },
    { value: "neutral", emoji: "😐", label: "Neutral" },
    { value: "confused", emoji: "🤔", label: "Confused" },
    { value: "frustrated", emoji: "😣", label: "Frustrated" },
    { value: "motivated", emoji: "💪", label: "Motivated" },
  ]

  const handleSaveEntry = () => {
    if (!journalContent.trim()) return

    const newEntry: JournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: journalContent,
      language: selectedLanguage,
      mood: selectedMood,
      tags: selectedTags,
      wordCount: journalContent.split(/\s+/).filter(Boolean).length,
    }

    setEntries([newEntry, ...entries])
    setJournalContent("")
    setSelectedTags([])
    setActiveTab("history")

    // In a real app, we would save this to a database
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const getMoodEmoji = (mood: string): string => {
    const found = moodOptions.find((m) => m.value === mood)
    return found ? found.emoji : "😐"
  }

  const getLanguageLabel = (lang: "native" | "learning"): string => {
    return lang === "learning" ? "English" : "Portuguese"
  }

  const getLanguageFlag = (lang: "native" | "learning"): string => {
    return lang === "learning" ? "🇬🇧" : "🇧🇷"
  }

  const getMoodColor = (mood: string): string => {
    switch (mood) {
      case "happy":
        return "bg-suri-mint/20 text-green-700 border-suri-mint/30"
      case "proud":
        return "bg-suri-teal/20 text-teal-700 border-suri-teal/30"
      case "confused":
        return "bg-suri-yellow/20 text-amber-700 border-suri-yellow/30"
      case "frustrated":
        return "bg-suri-rose/20 text-rose-700 border-suri-rose/30"
      case "motivated":
        return "bg-suri-blue/20 text-blue-700 border-suri-blue/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-suri-lavender/10 to-suri-mint/10 pb-3">
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-suri-lavender" />
          <h3 className="font-medium text-lg">Language Learning Journal</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="write" className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Write Entry
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Journal History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedLanguage === "learning" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage("learning")}
                  className={selectedLanguage === "learning" ? "bg-suri-blue text-white" : ""}
                >
                  <span className="mr-1">🇬🇧</span>
                  Practice English
                </Button>
                <Button
                  variant={selectedLanguage === "native" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage("native")}
                  className={selectedLanguage === "native" ? "bg-suri-lavender text-white" : ""}
                >
                  <span className="mr-1">🇧🇷</span>
                  Write in Portuguese
                </Button>
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMoodPicker(!showMoodPicker)}
                  className="flex items-center"
                >
                  <span className="mr-1">{getMoodEmoji(selectedMood)}</span>
                  <span className="capitalize">{selectedMood}</span>
                </Button>

                {showMoodPicker && (
                  <div className="absolute right-0 top-full mt-1 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border z-10 grid grid-cols-3 gap-1 min-w-[180px] animate-fade-in">
                    {moodOptions.map((mood) => (
                      <Button
                        key={mood.value}
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center h-auto py-2"
                        onClick={() => {
                          setSelectedMood(mood.value)
                          setShowMoodPicker(false)
                        }}
                      >
                        <span className="text-lg mb-1">{mood.emoji}</span>
                        <span className="text-xs">{mood.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <textarea
                className="w-full min-h-[200px] p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-suri-lavender focus:border-transparent resize-none"
                placeholder={
                  selectedLanguage === "learning"
                    ? "Write about your language learning journey in English..."
                    : "Escreva sobre sua jornada de aprendizado de idiomas em Português..."
                }
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
              />

              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{journalContent.split(/\s+/).filter(Boolean).length} words</span>
                <span>Weekly goal: 3/5 entries</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Add tags:</div>
              <div className="flex flex-wrap gap-1">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`cursor-pointer ${
                      selectedTags.includes(tag)
                        ? "bg-suri-blue/10 text-blue-700 border-suri-blue/30"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSaveEntry}
                disabled={!journalContent.trim()}
                className="bg-suri-lavender hover:bg-suri-lavender/80 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
            {entries.length > 0 ? (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div key={entry.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/20 p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 flex items-center">
                          <span className="mr-1">{getLanguageFlag(entry.language)}</span>
                          {getLanguageLabel(entry.language)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{entry.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Badge className={`${getMoodColor(entry.mood)} flex items-center`}>
                          <span className="mr-1">{getMoodEmoji(entry.mood)}</span>
                          <span className="capitalize">{entry.mood}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="whitespace-pre-wrap mb-3">{entry.content}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {entry.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="bg-muted/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {entry.aiInsights && (
                        <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-suri-blue/5 to-suri-lavender/5 border border-suri-blue/20">
                          <div className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-suri-blue mr-2 mt-0.5" />
                            <div>
                              <div className="text-xs font-medium text-suri-blue mb-1">SURI's Insights:</div>
                              <p className="text-sm">{entry.aiInsights}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">Your journal is empty</h3>
                <p className="text-muted-foreground mb-4">
                  Start writing entries to track your language learning journey
                </p>
                <Button onClick={() => setActiveTab("write")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Write First Entry
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-start">
            <MessageSquare className="h-4 w-4 text-suri-lavender mr-2 mt-0.5" />
            <div>
              <div className="text-sm font-medium mb-1">Why keep a language journal?</div>
              <p className="text-sm text-muted-foreground">
                Regular journaling helps track your progress, identify patterns in your learning, and build confidence.
                Try to write at least 3 entries per week, alternating between your native and learning languages.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

