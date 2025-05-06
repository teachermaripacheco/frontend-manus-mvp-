"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { LearningStyle } from "@/contexts/user-context"

interface Question {
  id: number
  text: string
  options: {
    text: string
    style: LearningStyle
  }[]
}

const learningStyleQuestions: Question[] = [
  {
    id: 1,
    text: "When learning new vocabulary, you prefer to:",
    options: [
      { text: "Use flashcards with images", style: "Visual" },
      { text: "Repeat the words out loud", style: "Auditory" },
      { text: "Write the words down multiple times", style: "Reading/Writing" },
      { text: "Act out the meaning of the words", style: "Kinesthetic" },
    ],
  },
  {
    id: 2,
    text: "When trying to remember something, you often:",
    options: [
      { text: "Visualize pictures or diagrams", style: "Visual" },
      { text: "Recall sounds or conversations", style: "Auditory" },
      { text: "Remember what you've read or written", style: "Reading/Writing" },
      { text: "Remember actions or movements", style: "Kinesthetic" },
    ],
  },
  {
    id: 3,
    text: "You learn best when:",
    options: [
      { text: "You can see charts, images, or videos", style: "Visual" },
      { text: "You can listen to explanations", style: "Auditory" },
      { text: "You can read and take notes", style: "Reading/Writing" },
      { text: "You can do hands-on activities", style: "Kinesthetic" },
    ],
  },
  {
    id: 4,
    text: "When receiving directions to a new place, you prefer:",
    options: [
      { text: "Looking at a map", style: "Visual" },
      { text: "Listening to verbal instructions", style: "Auditory" },
      { text: "Reading written directions", style: "Reading/Writing" },
      { text: "Using a GPS and actively finding your way", style: "Kinesthetic" },
    ],
  },
  {
    id: 5,
    text: "When learning a new language concept, you understand best when:",
    options: [
      { text: "The teacher uses visual aids", style: "Visual" },
      { text: "You discuss it out loud", style: "Auditory" },
      { text: "You read about it in detail", style: "Reading/Writing" },
      { text: "You practice it in real situations", style: "Kinesthetic" },
    ],
  },
]

export default function LearningStyleAssessment() {
  const { updateProfile } = useUser()
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, LearningStyle>>({})

  const handleAnswer = (questionId: number, style: LearningStyle) => {
    setAnswers({
      ...answers,
      [questionId]: style,
    })
  }

  const handleContinue = () => {
    // Calculate dominant learning style
    const styleCounts: Record<LearningStyle, number> = {
      Visual: 0,
      Auditory: 0,
      Kinesthetic: 0,
      "Reading/Writing": 0,
    }

    Object.values(answers).forEach((style) => {
      styleCounts[style]++
    })

    // Find the dominant style (highest count)
    let dominantStyle: LearningStyle = "Visual"
    let maxCount = 0

    Object.entries(styleCounts).forEach(([style, count]) => {
      if (count > maxCount) {
        maxCount = count
        dominantStyle = style as LearningStyle
      }
    })

    updateProfile({ learningStyle: dominantStyle })
    router.push("/onboarding/disc")
  }

  const isComplete = Object.keys(answers).length === learningStyleQuestions.length

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Your Learning Style</h2>
          <p className="text-muted-foreground mb-4">
            Understanding how you prefer to learn helps us tailor your experience.
          </p>
        </div>

        <div className="space-y-8">
          {learningStyleQuestions.map((question) => (
            <div key={question.id} className="space-y-3">
              <h3 className="font-medium">{question.text}</h3>
              <RadioGroup
                value={answers[question.id]}
                onValueChange={(value) => handleAnswer(question.id, value as LearningStyle)}
              >
                <div className="grid grid-cols-1 gap-2">
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem id={`q${question.id}-option${idx}`} value={option.style} />
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

