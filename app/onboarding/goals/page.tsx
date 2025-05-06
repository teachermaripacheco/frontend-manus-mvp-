"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Italian",
  "Portuguese",
  "Russian",
  "Korean",
  "Arabic",
]

const goalOptions = [
  "Travel to countries where the language is spoken",
  "Communicate with friends or family",
  "Advance my career or education",
  "Enjoy media (movies, books, music) in the original language",
  "Living in a country where the language is spoken",
  "Personal interest and brain training",
  "Cultural understanding and appreciation",
  "Business or professional requirements",
  "Other",
]

export default function GoalsPage() {
  const router = useRouter()
  const [goals, setGoals] = useState<string[]>([])
  const [language, setLanguage] = useState("Spanish")
  const [level, setLevel] = useState("Beginner")
  const [customGoal, setCustomGoal] = useState("")

  // Load saved progress when component mounts
  useEffect(() => {
    const savedGoals = localStorage.getItem("onboardingGoals")
    const savedLevel = localStorage.getItem("onboardingLevel")
    const savedLanguage = localStorage.getItem("onboardingLanguage")
    const savedCustomGoal = localStorage.getItem("onboardingCustomGoal")

    if (savedGoals) setGoals(JSON.parse(savedGoals))
    if (savedLevel) setLevel(savedLevel)
    if (savedLanguage) setLanguage(savedLanguage)
    if (savedCustomGoal) setCustomGoal(savedCustomGoal)
  }, [])

  // Save progress when values change
  useEffect(() => {
    localStorage.setItem("onboardingGoals", JSON.stringify(goals))
    localStorage.setItem("onboardingLevel", level)
    localStorage.setItem("onboardingLanguage", language)
    localStorage.setItem("onboardingCustomGoal", customGoal)
  }, [goals, level, language, customGoal])

  const { user, updateProfile } = useUser()

  const [learningLanguage, setLearningLanguage] = useState(user?.learningLanguage || "")
  const [nativeLanguage, setNativeLanguage] = useState(user?.nativeLanguage || "")
  const [selectedGoals, setSelectedGoals] = useState<string[]>(user?.goals || [])

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(selectedGoals.includes(goal) ? selectedGoals.filter((g) => g !== goal) : [...selectedGoals, goal])
  }

  const handleContinue = () => {
    if (isFormValid) {
      // If the user has selected "Other" as a goal, include their custom input
      const finalGoals = goals.includes("Other")
        ? goals.filter((g) => g !== "Other").concat(`Other: ${customGoal}`)
        : goals

      // You'd typically save this to your backend or context
      console.log("Selected goals:", finalGoals)
      console.log("Selected language:", language)
      console.log("Selected level:", level)

      // Clear localStorage after successful completion
      // Comment this out if you want to save across the entire onboarding flow
      // localStorage.removeItem('onboardingGoals')
      // localStorage.removeItem('onboardingLevel')
      // localStorage.removeItem('onboardingLanguage')
      // localStorage.removeItem('onboardingCustomGoal')

      router.push("/dashboard")
    }
  }

  const isFormValid =
    language && language && level && goals.length > 0 && (!goals.includes("Other") || customGoal.trim() !== "")

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Your Language Learning Goals</h2>
          <p className="text-muted-foreground mb-4">Let's understand your language learning journey better.</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="learning-language">I want to learn</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="learning-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="native-language">My native language is</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="native-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">My current level is</Label>
            <div className="text-sm text-muted-foreground mb-3">
              <p className="mb-1">
                <strong>Beginner:</strong> Little to no knowledge of the language. Can recognize a few words or phrases.
              </p>
              <p className="mb-1">
                <strong>Elementary:</strong> Can understand and use familiar everyday expressions and basic phrases.
              </p>
              <p className="mb-1">
                <strong>Intermediate:</strong> Can understand main points on familiar matters and handle most travel
                situations.
              </p>
              <p className="mb-1">
                <strong>Advanced:</strong> Can understand complex texts and interact with fluency on a wide range of
                topics.
              </p>
              <p>
                <strong>Proficient:</strong> Can understand virtually everything heard or read and express themselves
                spontaneously.
              </p>
            </div>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="elementary">Elementary</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="proficient">Proficient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>My goals for learning this language are (select all that apply)</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {goalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={`goal-${goal}`}
                    checked={goals.includes(goal)}
                    onCheckedChange={() =>
                      setGoals(goals.includes(goal) ? goals.filter((g) => g !== goal) : [...goals, goal])
                    }
                  />
                  <Label htmlFor={`goal-${goal}`} className="text-sm">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
            {goals.includes("Other") && (
              <div className="ml-6 mt-2">
                <Label htmlFor="custom-goal" className="sr-only">
                  Specify your goal
                </Label>
                <input
                  id="custom-goal"
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="Tell us specifically why you want to learn this language..."
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleContinue}
            disabled={!isFormValid}
            className="bg-suri-blue hover:bg-suri-blue/80 text-black"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

