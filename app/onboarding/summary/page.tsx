"use client"

import { useUser } from "@/contexts/user-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingSummary() {
  const { user, setOnboardingComplete } = useUser()
  const router = useRouter()

  const handleComplete = () => {
    setOnboardingComplete()
    router.push("/dashboard")
  }

  if (!user) return null

  // Map DISC profile to a friendly description
  const getDiscDescription = (profile?: string) => {
    const descriptions: Record<string, string> = {
      D: "Decisive and direct",
      I: "Interactive and inspiring",
      S: "Stable and supportive",
      C: "Cautious and analytical",
      "D/I": "Direct and sociable",
      "D/C": "Direct and detail-oriented",
      "I/S": "Sociable and supportive",
      "S/C": "Supportive and analytical",
      "C/S": "Analytical and supportive",
    }
    return profile ? descriptions[profile] || profile : "Not assessed"
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-suri-mint/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-suri-mint" />
          </div>
          <h2 className="text-xl font-bold mb-2">Your Profile is Complete!</h2>
          <p className="text-muted-foreground">
            Based on your answers, we've created a personalized learning experience for you.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border bg-muted/10">
              <div className="text-xs text-muted-foreground">Learning</div>
              <div className="font-medium">{user.learningLanguage}</div>
            </div>
            <div className="p-3 rounded-lg border bg-muted/10">
              <div className="text-xs text-muted-foreground">Native Language</div>
              <div className="font-medium">{user.nativeLanguage}</div>
            </div>
            <div className="p-3 rounded-lg border bg-muted/10">
              <div className="text-xs text-muted-foreground">Current Level</div>
              <div className="font-medium">{user.level}</div>
            </div>
            <div className="p-3 rounded-lg border bg-muted/10">
              <div className="text-xs text-muted-foreground">Learning Style</div>
              <div className="font-medium">{user.learningStyle || "Not assessed"}</div>
            </div>
            <div className="p-3 rounded-lg border bg-muted/10">
              <div className="text-xs text-muted-foreground">DISC Profile</div>
              <div className="font-medium">{getDiscDescription(user.discProfile)}</div>
            </div>
            <div className="p-3 rounded-lg border bg-muted/10">
              <div className="text-xs text-muted-foreground">Primary Goals</div>
              <div className="font-medium">
                {user.goals?.length ? `${user.goals.length} selected` : "None selected"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-suri-blue/10 border border-suri-blue/30">
            <h3 className="font-medium mb-2">How SURI AI Will Support You</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Based on your profile, we'll provide a personalized learning experience that:
            </p>
            <ul className="text-sm space-y-1">
              {user.learningStyle === "Visual" && (
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-suri-blue mr-2"></span>
                  <span>Uses visual aids and diagrams to reinforce concepts</span>
                </li>
              )}
              {user.learningStyle === "Auditory" && (
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-suri-blue mr-2"></span>
                  <span>Emphasizes speaking and listening exercises</span>
                </li>
              )}
              {user.learningStyle === "Reading/Writing" && (
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-suri-blue mr-2"></span>
                  <span>Provides written materials and note-taking opportunities</span>
                </li>
              )}
              {user.learningStyle === "Kinesthetic" && (
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-suri-blue mr-2"></span>
                  <span>Includes interactive exercises and roleplays</span>
                </li>
              )}
              {user.discProfile?.includes("D") && (
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-suri-blue mr-2"></span>
                  <span>Provides direct feedback and clear objectives</span>
                </li>
              )}
              {user.discProfile?.includes("I") && (
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-suri-blue mr-2"></span>
                  <span>Creates engaging, social learning experiences</span>
                </li>
              )}
              {user.discProfile?.includes("S") && (
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-suri-blue mr-2"></span>
                  <span>Maintains a supportive, steady learning pace</span>
                </li>
              )}
              {user.discProfile?.includes("C") && (
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-suri-blue mr-2"></span>
                  <span>Provides detailed explanations and structured learning</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Button onClick={handleComplete} className="bg-suri-blue hover:bg-suri-blue/80 text-white">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </Card>
  )
}

