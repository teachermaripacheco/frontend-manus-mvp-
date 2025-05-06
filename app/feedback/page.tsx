"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check } from "lucide-react"
import { submitFeedback } from "@/lib/apiClient" // Import API function
import { useToast } from "@/components/ui/use-toast" // Import useToast

export default function FeedbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  const [planId, setPlanId] = useState<string | null>(null)
  const [rating, setRating] = useState<string | null>(null)
  const [comments, setComments] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get planId from query parameters
    const id = searchParams.get("planId")
    if (id) {
      setPlanId(id)
    } else {
      // Handle missing planId - maybe redirect back or show error
      toast({ title: "Error", description: "Plan ID not found. Cannot submit feedback.", variant: "destructive" })
      console.error("Plan ID missing from URL query parameters.")
      // Optionally redirect back
      // router.back()
    }
  }, [searchParams, toast, router])

  const handleFeedbackSubmit = async () => {
    if (!rating) {
        toast({ title: "Error", description: "Please select a rating.", variant: "destructive" })
        return
    }
    if (!planId) {
        toast({ title: "Error", description: "Plan ID is missing. Cannot submit feedback.", variant: "destructive" })
        return
    }

    setIsLoading(true)
    const feedbackData = {
      rating: parseInt(rating, 10),
      comments: comments,
      plan_id: planId // Include the plan ID
    }

    console.log("Submitting feedback:", feedbackData)

    try {
      const response = await submitFeedback(feedbackData);
      console.log("Feedback submitted successfully:", response.data)

      toast({ title: "Feedback Submitted", description: "Thank you for your input!" })
      // Navigate to a confirmation or dashboard page after submission
      router.push("/dashboard") // Redirecting to dashboard for now

    } catch (error: any) {
      console.error("Error submitting feedback:", error)
      const errorMessage = error.response?.data?.detail || "Failed to submit your feedback. Please try again."
      toast({ title: "Submission Failed", description: errorMessage, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4">
      <Card className="w-full max-w-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Feedback on Your Plan</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Help us improve! How helpful was the learning plan (ID: {planId || "N/A"})?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-2">
            <Label className="font-semibold">Overall Rating:</Label>
            <RadioGroup value={rating ?? undefined} onValueChange={setRating} className="flex space-x-4 justify-center pt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value={String(value)} id={`rating-${value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`rating-${value}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted bg-background text-lg font-semibold transition-colors peer-data-[state=checked]:border-suri-blue peer-data-[state=checked]:bg-suri-blue peer-data-[state=checked]:text-white hover:bg-accent hover:text-accent-foreground cursor-pointer`}
                  >
                    {value}
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {value === 1 ? "Not helpful" : value === 5 ? "Very helpful" : ""}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Comments Section */}
          <div className="space-y-2">
            <Label htmlFor="comments" className="font-semibold">Additional Comments (Optional):</Label>
            <Textarea
              id="comments"
              placeholder="What did you like or dislike? Any suggestions?"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleFeedbackSubmit}
              disabled={!rating || !planId || isLoading}
              className="bg-suri-blue hover:bg-suri-blue/80 text-white"
            >
              {isLoading ? (
                 <>
                   <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                   Submitting...
                 </>
              ) : (
                <>Submit Feedback <Check className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

