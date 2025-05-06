"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Globe } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function OnboardingPage() {
  const router = useRouter()
  const { user, updateProfile } = useUser()
  const [nativeLanguage, setNativeLanguage] = useState("")
  const [learningLanguage, setLearningLanguage] = useState("")
  const [level, setLevel] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = async () => {
    if (!nativeLanguage || !learningLanguage || !level) return

    setIsLoading(true)

    try {
      // Update user profile with language preferences
      await updateProfile({
        nativeLanguage,
        learningLanguage,
        level,
      })

      // Navigate to the next step in onboarding
      router.push("/onboarding/mentor-choice")
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-screen-md mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome to SURI AI</h1>
        <p className="text-muted-foreground">Let's set up your language learning profile</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Language Preferences
          </CardTitle>
          <CardDescription>Tell us about your language learning goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nativeLanguage">Your Native Language</Label>
            <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
              <SelectTrigger id="nativeLanguage">
                <SelectValue placeholder="Select your native language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
                <SelectItem value="Korean">Korean</SelectItem>
                <SelectItem value="Russian">Russian</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="learningLanguage">Language You Want to Learn</Label>
            <Select value={learningLanguage} onValueChange={setLearningLanguage}>
              <SelectTrigger id="learningLanguage">
                <SelectValue placeholder="Select language to learn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
                <SelectItem value="Korean">Korean</SelectItem>
                <SelectItem value="Russian">Russian</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Your Current Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level">
                <SelectValue placeholder="Select your current level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner (A1)</SelectItem>
                <SelectItem value="Elementary">Elementary (A2)</SelectItem>
                <SelectItem value="Intermediate">Intermediate (B1)</SelectItem>
                <SelectItem value="Upper Intermediate">Upper Intermediate (B2)</SelectItem>
                <SelectItem value="Advanced">Advanced (C1)</SelectItem>
                <SelectItem value="Proficient">Proficient (C2)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!nativeLanguage || !learningLanguage || !level || isLoading}
            className="bg-suri-blue hover:bg-suri-blue/80 text-white"
          >
            {isLoading ? "Saving..." : "Continue"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

