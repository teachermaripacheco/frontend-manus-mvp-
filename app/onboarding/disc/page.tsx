"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { DiscProfile } from "@/contexts/user-context"

interface Question {
  id: number
  text: string
  options: {
    text: string
    trait: "D" | "I" | "S" | "C"
    score: number
  }[]
}

const discQuestions: Question[] = [
  {
    id: 1,
    text: "In a group setting, you typically:",
    options: [
      { text: "Take charge and make decisions", trait: "D", score: 3 },
      { text: "Engage with everyone and share stories", trait: "I", score: 3 },
      { text: "Support others and maintain harmony", trait: "S", score: 3 },
      { text: "Analyze the situation before contributing", trait: "C", score: 3 },
    ],
  },
  {
    id: 2,
    text: "When facing a challenge, you tend to:",
    options: [
      { text: "Address it head-on and find a quick solution", trait: "D", score: 3 },
      { text: "Talk it through with others and brainstorm ideas", trait: "I", score: 3 },
      { text: "Consider how it affects everyone involved", trait: "S", score: 3 },
      { text: "Research thoroughly before deciding on an approach", trait: "C", score: 3 },
    ],
  },
  {
    id: 3,
    text: "Your ideal learning environment is:",
    options: [
      { text: "Fast-paced with clear objectives", trait: "D", score: 3 },
      { text: "Interactive with group activities", trait: "I", score: 3 },
      { text: "Supportive with clear guidance", trait: "S", score: 3 },
      { text: "Structured with detailed information", trait: "C", score: 3 },
    ],
  },
  {
    id: 4,
    text: "When receiving feedback, you prefer it to be:",
    options: [
      { text: "Direct and to the point", trait: "D", score: 3 },
      { text: "Enthusiastic and encouraging", trait: "I", score: 3 },
      { text: "Gentle and constructive", trait: "S", score: 3 },
      { text: "Detailed and specific", trait: "C", score: 3 },
    ],
  },
  {
    id: 5,
    text: "When making decisions, you typically:",
    options: [
      { text: "Decide quickly based on results", trait: "D", score: 3 },
      { text: "Consider how it will be received by others", trait: "I", score: 3 },
      { text: "Take time to ensure everyone's comfort", trait: "S", score: 3 },
      { text: "Analyze all data and consider all options", trait: "C", score: 3 },
    ],
  },
]

export default function DiscAssessment() {
  const { updateProfile } = useUser()
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, { trait: "D" | "I" | "S" | "C"; score: number }>>({})

  const handleAnswer = (questionId: number, trait: "D" | "I" | "S" | "C", score: number) => {
    setAnswers({
      ...answers,
      [questionId]: { trait, score },
    })
  }

  const handleContinue = () => {
    // Calculate DISC profile
    const traitScores = {
      D: 0,
      I: 0,
      S: 0,
      C: 0,
    }

    Object.values(answers).forEach(({ trait, score }) => {
      traitScores[trait] += score
    })

    // Find the top two traits
    const topTraits = Object.entries(traitScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([trait]) => trait)

    let discProfile: DiscProfile

    if (topTraits[0] === topTraits[1]) {
      // If there's a tie for the top trait, just use that one
      discProfile = topTraits[0] as DiscProfile
    } else {
      // Combine the top two traits
      discProfile = `${topTraits[0]}/${topTraits[1]}` as DiscProfile
    }

    updateProfile({ discProfile })
    router.push("/onboarding/emotions")
  }

  const isComplete = Object.keys(answers).length === discQuestions.length

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Your Personality Profile</h2>
          <p className="text-muted-foreground mb-4">
            Understanding your personality helps us tailor our communication style to your preferences.
          </p>
        </div>

        <div className="space-y-8">
          {discQuestions.map((question) => (
            <div key={question.id} className="space-y-3">
              <h3 className="font-medium">{question.text}</h3>
              <RadioGroup
                value={answers[question.id]?.trait}
                onValueChange={(value) => {
                  const option = question.options.find((opt) => opt.trait === value)
                  if (option) {
                    handleAnswer(question.id, option.trait, option.score)
                  }
                }}
              >
                <div className="grid grid-cols-1 gap-2">
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem id={`q${question.id}-option${idx}`} value={option.trait} />
                      <Label htmlFor={`q${question.id}-option${idx}`} className="text-sm">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleContinue}
            disabled={!isComplete}
            className="bg-suri-blue hover:bg-suri-blue/80 text-white"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

