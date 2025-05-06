"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getStudentPlan } from "@/lib/apiClient" // Import API function
import { useToast } from "@/components/ui/use-toast" // Import useToast

// Define the expected Plan structure based on backend PlanInDB model
interface PlanActivity {
  type: string;
  title: string;
  duration: string;
}

interface Plan {
  id: string;
  user_id: string;
  week: number;
  theme: string;
  goals: string[];
  activities: PlanActivity[];
  focusAreas: string[];
  created_at?: any; // Optional timestamp
}

export default function PlanDisplayPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [plan, setPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlan = async () => {
      setIsLoading(true)
      try {
        const response = await getStudentPlan();
        console.log("Fetched plan:", response.data)
        setPlan(response.data); 
      } catch (error: any) {
        console.error("Error fetching plan:", error)
        const errorMessage = error.response?.data?.detail || "Failed to load your learning plan."
        toast({ title: "Loading Failed", description: errorMessage, variant: "destructive" })
        // Keep plan as null, the component will render an error message
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPlan()
  }, [toast])

  const handleContinue = () => {
    // Navigate to the feedback page, passing plan ID if needed
    router.push(`/feedback?planId=${plan?.id}`) // Pass planId as query param
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading your plan...</span>
        </div>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4">
        <Card className="w-full max-w-md p-6 text-center">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Failed to load your learning plan.</p>
                <p className="text-sm text-muted-foreground mt-2">Please check your connection or try again later.</p>
                <Button variant="outline" onClick={() => router.back()} className="mt-4">Go Back</Button>
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10 p-4">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Your Personalized Learning Plan</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Week {plan.week}: {plan.theme}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Goals */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Weekly Goals</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {plan.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Activities */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Suggested Activities</h3>
            <div className="space-y-3">
              {plan.activities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-background">
                  <div className="flex items-center space-x-3">
                    <Badge variant={activity.type === "Lesson" ? "default" : activity.type === "Practice" ? "secondary" : "outline"}
                           className={`text-xs ${activity.type === "Lesson" ? "bg-suri-blue text-white" : ""}`}>
                      {activity.type}
                    </Badge>
                    <span className="text-sm font-medium">{activity.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Focus Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {plan.focusAreas.map((area, index) => (
                <Badge key={index} variant="outline">{area}</Badge>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleContinue}
              className="bg-suri-blue hover:bg-suri-blue/80 text-white"
            >
              Provide Feedback <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

