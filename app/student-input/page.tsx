"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { submitStudentInput } from "@/lib/apiClient" // Import API function
import { useToast } from "@/components/ui/use-toast" // Import useToast

// Simplified goal options based on V0 goals/page.tsx
const goalOptions = [
  "Travel",
  "Communicate with friends/family",
  "Career/Education",
  "Enjoy media (movies, books, music)",
  "Living abroad",
  "Personal interest/Brain training",
  "Cultural understanding",
  "Other",
]

export default function StudentInputPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [customGoal, setCustomGoal] = useState("")
  const [struggles, setStruggles] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load saved data (optional, could be useful if user navigates away)
  useEffect(() => {
    const savedGoals = localStorage.getItem("studentInputGoals")
    const savedCustomGoal = localStorage.getItem("studentInputCustomGoal")
    const savedStruggles = localStorage.getItem("studentInputStruggles")

    if (savedGoals) setSelectedGoals(JSON.parse(savedGoals))
    if (savedCustomGoal) setCustomGoal(savedCustomGoal)
    if (savedStruggles) setStruggles(savedStruggles)
  }, [])

  // Save data
  useEffect(() => {
    localStorage.setItem("studentInputGoals", JSON.stringify(selectedGoals))
    localStorage.setItem("studentInputCustomGoal", customGoal)
    localStorage.setItem("studentInputStruggles", struggles)
  }, [selectedGoals, customGoal, struggles])

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(
      selectedGoals.includes(goal)
        ? selectedGoals.filter((g) => g !== goal)
        : [...selectedGoals, goal]
    )
  }

  const handleContinue = async () => {
    if (!isFormValid) return

    setIsLoading(true)
    const finalGoals = selectedGoals.includes("Other")
      ? selectedGoals.filter((g) => g !== "Other").concat(`Other: ${customGoal}`)
      : selectedGoals

    const inputData = {
      goals: finalGoals,
      struggles: struggles,
    }

    console.log("Submitting student input:", inputData)

    try {
      const response = await submitStudentInput(inputData);
      console.log("Student input submitted successfully:", response.data)
      
      // Clear local storage on success
      localStorage.removeItem("studentInputGoals")
      localStorage.removeItem("studentInputCustomGoal")
      localStorage.removeItem("studentInputStruggles")

      toast({ title: "Input Saved", description: "Generating your learning plan..." })
      // Navigate to the next step (AI Plan Generation Trigger)
      router.push("/ai-plan-generation") 

    } catch (error: any) {
      console.error("Error submitting student input:", error)
      const errorMessage = error.response?.data?.detail || "Failed to save your input. Please try again."
      toast({ title: "Submission Failed", description: errorMessage, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    selectedGoals.length > 0 &&
    (!selectedGoals.includes("Other") || customGoal.trim() !== "") &&
    struggles.trim() !== ""

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4">
      <Card className="w-full max-w-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Your Learning Journey</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Tell us about your goals and challenges so we can personalize your plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Goals Section */}
          <div className="space-y-2">
            <Label className="font-semibold">What are your main goals for learning this language? (Select all that apply)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {goalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={`goal-${goal}`}
                    checked={selectedGoals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
                  />
                  <Label htmlFor={`goal-${goal}`} className="text-sm font-normal">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
            {selectedGoals.includes("Other") && (
              <div className="ml-6 mt-2">
                <Label htmlFor="custom-goal" className="sr-only">
                  Specify your other goal
                </Label>
                <Textarea
                  id="custom-goal"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="Please specify your other goal..."
                  className="w-full p-2 border rounded-md text-sm mt-1"
                  rows={2}
                />
              </div>
            )}
          </div>

          {/* Struggles Section */}
          <div className="space-y-2">
            <Label htmlFor="struggles" className="font-semibold">What are your main struggles or blockers when learning a language?</Label>
            <Textarea
              id="struggles"
              placeholder="e.g., Fear of speaking, difficulty with grammar, lack of motivation, finding time..."
              value={struggles}
              onChange={(e) => setStruggles(e.target.value)}
              rows={4}
              required
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleContinue}
              disabled={!isFormValid || isLoading}
              className="bg-suri-blue hover:bg-suri-blue/80 text-white"
            >
              {isLoading ? (
                 <>
                   <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                   Submitting...
                 </>
              ) : (
                <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

