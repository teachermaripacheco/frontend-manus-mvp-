"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { triggerPlanGeneration } from "@/lib/apiClient" // Import API function
import { useToast } from "@/components/ui/use-toast" // Import useToast

export default function AiPlanGenerationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [message, setMessage] = useState("Triggering AI plan generation...")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generatePlan = async () => {
      setIsLoading(true)
      setMessage("Generating your personalized learning plan...")
      try {
        // Call the backend endpoint to trigger plan generation
        const response = await triggerPlanGeneration()
        console.log("Plan generation triggered successfully:", response.data)
        
        // Assuming the backend generates the plan synchronously for now
        // In a real async scenario, we might need polling or websockets
        setMessage("Plan generated! Redirecting...")
        toast({ title: "Plan Generated", description: "Loading your plan details." })
        
        // Navigate to the plan display page after successful trigger/generation
        router.push("/plan-display") 

      } catch (error: any) {
        console.error("Error triggering plan generation:", error)
        const errorMessage = error.response?.data?.detail || "Failed to generate your learning plan. Please try again later."
        setMessage("Error generating plan.")
        toast({ title: "Generation Failed", description: errorMessage, variant: "destructive" })
        setIsLoading(false)
        // Optional: Redirect back to input page or show error state
        // router.push("/student-input") 
      }
      // No finally block needed for setIsLoading if redirecting on success
    }

    generatePlan()
    
    // No cleanup needed as the effect runs once and navigates away or shows error
  }, [router, toast])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">AI Plan Generation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="h-6 w-6 border-4 border-suri-blue border-t-transparent rounded-full animate-spin" />
              <span>{message}</span>
            </div>
          ) : (
            <p className="text-red-500">{message}</p> // Show error message if loading finished due to error
          )}
          <p className="text-sm text-muted-foreground">Please wait while our AI crafts the perfect learning path for you based on your goals and challenges.</p>
        </CardContent>
      </Card>
    </div>
  )
}

