"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const emotionalNeeds = [
  {
    id: "encouragement",
    label: "Encouragement when I'm struggling",
    description: "Support and positive reinforcement during difficult moments",
  },
  {
    id: "patience",
    label: "Patience with my learning pace",
    description: "Understanding when I need more time to grasp concepts",
  },
  {
    id: "celebration",
    label: "Celebration of my achievements",
    description: "Recognition when I reach milestones or make progress",
  },
  {
    id: "structure",
    label: "Clear structure and expectations",
    description: "Knowing what's expected and having a defined path",
  },
  {
    id: "challenges",
    label: "Challenging content to keep me engaged",
    description: "Materials that stretch my abilities without overwhelming me",
  },
  {
    id: "safety",
    label: "Safe environment to make mistakes",
    description: "Freedom to experiment without fear of judgment",
  },
  {
    id: "feedback",
    label: "Constructive feedback on my performance",
    description: "Specific guidance on how to improve",
  },
  {
    id: "connection",
    label: "Personal connection with my learning",
    description: "Content that relates to my interests and goals",
  },
]

export default function EmotionsAssessment() {
  const { updateProfile } = useUser()
  const router = useRouter()
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [emotionalExperience, setEmotionalExperience] = useState("")

  const handleNeedToggle = (needId: string) => {
    setSelectedNeeds(
      selectedNeeds.includes(needId) ? selectedNeeds.filter((id) => id !== needId) : [...selectedNeeds, needId],
    )
  }

  const handleContinue = () => {
    updateProfile({
      emotionalNeeds: selectedNeeds,
      // In a real app, you might store the emotional experience text as well
    })
    router.push("/onboarding/summary")
  }

  const isFormValid = selectedNeeds.length > 0

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Your Emotional Needs</h2>
          <p className="text-muted-foreground mb-4">
            Let us know how we can best support your emotional wellbeing during language learning.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Select the emotional support you value most (choose at least 3):</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {emotionalNeeds.map((need) => (
                <div
                  key={need.id}
                  className={`flex items-start space-x-2 p-3 rounded-lg border ${
                    selectedNeeds.includes(need.id) ? "border-suri-blue bg-suri-blue/5" : ""
                  }`}
                >
                  <Checkbox
                    id={need.id}
                    checked={selectedNeeds.includes(need.id)}
                    onCheckedChange={() => handleNeedToggle(need.id)}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor={need.id} className="font-medium text-sm">
                      {need.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{need.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emotional-experience">
              Optional: Tell us about a previous language learning experience that was emotionally challenging or
              rewarding
            </Label>
            <Textarea
              id="emotional-experience"
              placeholder="Share your experience..."
              value={emotionalExperience}
              onChange={(e) => setEmotionalExperience(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleContinue}
            disabled={!isFormValid}
            className="bg-suri-blue hover:bg-suri-blue/80 text-white"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

