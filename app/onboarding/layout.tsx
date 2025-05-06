"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { redirect, usePathname } from "next/navigation"
import { Progress } from "@/components/ui/progress"

const onboardingSteps = [
  { path: "/onboarding", label: "Welcome" },
  { path: "/onboarding/goals", label: "Goals" },
  { path: "/onboarding/learning-style", label: "Learning Style" },
  { path: "/onboarding/disc", label: "Personality" },
  { path: "/onboarding/emotions", label: "Emotions" },
  { path: "/onboarding/summary", label: "Summary" },
]

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser()
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isLoading) {
      // If no user is logged in, redirect to login page
      if (!user) {
        redirect("/login")
      }

      // If user has completed onboarding, redirect to dashboard
      if (user.completedOnboarding) {
        redirect("/dashboard")
      }
    }

    // Calculate progress
    const currentIndex = onboardingSteps.findIndex((step) => step.path === pathname)
    if (currentIndex >= 0) {
      setProgress(((currentIndex + 1) / onboardingSteps.length) * 100)
    }
  }, [user, isLoading, pathname])

  // Show nothing while loading
  if (isLoading) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <div className="flex items-center justify-center mb-8">
          <span className="text-3xl mr-2">🧠</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-suri-blue to-suri-lavender bg-clip-text text-transparent">
            SURI AI
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center mb-2">Let&apos;s Get to Know Each Other</h1>
          <p className="text-muted-foreground text-center">
            Help us personalize your language learning experience with emotional intelligence.
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Getting Started</span>
            <span>Profile Complete</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}

