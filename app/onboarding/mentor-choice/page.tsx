"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Bot, Users } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function MentorChoicePage() {
  const router = useRouter()
  const { user, updateProfile } = useUser()
  const [selectedOption, setSelectedOption] = useState<"ai" | "human" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = async () => {
    if (!selectedOption) return

    setIsLoading(true)

    try {
      // Update user profile with mentor choice
      await updateProfile({
        mentorType: selectedOption,
      })

      // Navigate to the next step in onboarding
      router.push("/onboarding/learning-style")
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-screen-md mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Choose Your Learning Experience</h1>
        <p className="text-muted-foreground">Select how you'd like to learn with SURI AI</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card
          className={`cursor-pointer transition-all ${
            selectedOption === "ai" ? "border-2 border-suri-blue ring-2 ring-suri-blue/20" : "hover:border-suri-blue/50"
          }`}
          onClick={() => setSelectedOption("ai")}
        >
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-suri-blue/10 flex items-center justify-center mb-4">
              <Bot className="h-6 w-6 text-suri-blue" />
            </div>
            <CardTitle>AI-Only Experience</CardTitle>
            <CardDescription>Learn exclusively with our AI language mentor</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>24/7 access to personalized AI language mentor</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Adaptive learning based on your style and emotions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Real-time feedback on pronunciation and grammar</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Unlimited practice sessions at your own pace</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">Perfect for self-directed learners</div>
          </CardFooter>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            selectedOption === "human"
              ? "border-2 border-suri-blue ring-2 ring-suri-blue/20"
              : "hover:border-suri-blue/50"
          }`}
          onClick={() => setSelectedOption("human")}
        >
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-suri-lavender/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-suri-lavender" />
            </div>
            <CardTitle>Human Mentor + AI</CardTitle>
            <CardDescription>Learn with both human and AI support</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Personal human mentor for scheduled sessions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Customized learning plan created by your mentor</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>AI assistant available between human sessions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Cultural insights and nuanced language guidance</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">Ideal for comprehensive language mastery</div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedOption || isLoading}
          className="bg-suri-blue hover:bg-suri-blue/80 text-white"
        >
          {isLoading ? "Saving..." : "Continue"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

