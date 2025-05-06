"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type {
  UserProfile,
  TheTalkData,
  DISCProfile,
  LearningStyle,
  VIAData,
  MoodEntry,
  ProgressData,
  LessonFeedback,
  UserPreferences,
  WeeklyInsights,
  AdaptiveLearningModel,
} from "@/lib/db-schema"

interface UserDataContextType {
  userProfile: UserProfile | null
  theTalkData: TheTalkData | null
  discProfile: DISCProfile | null
  learningStyle: LearningStyle | null
  viaData: VIAData | null
  moodEntries: MoodEntry[]
  progressData: ProgressData | null
  lessonFeedback: LessonFeedback[]
  userPreferences: UserPreferences | null
  weeklyInsights: WeeklyInsights | null
  adaptiveModel: AdaptiveLearningModel | null
  isLoading: boolean
  error: string | null
  refreshData: () => Promise<void>
  submitMoodEntry: (entry: Omit<MoodEntry, "id" | "timestamp">) => Promise<void>
  submitLessonFeedback: (feedback: Omit<LessonFeedback, "id" | "timestamp">) => Promise<void>
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>
  updateProgressData: (progress: Partial<ProgressData>) => Promise<void>
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined)

export const useUserData = () => {
  const context = useContext(UserDataContext)
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider")
  }
  return context
}

interface UserDataProviderProps {
  children: ReactNode
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [theTalkData, setTheTalkData] = useState<TheTalkData | null>(null)
  const [discProfile, setDiscProfile] = useState<DISCProfile | null>(null)
  const [learningStyle, setLearningStyle] = useState<LearningStyle | null>(null)
  const [viaData, setViaData] = useState<VIAData | null>(null)
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [lessonFeedback, setLessonFeedback] = useState<LessonFeedback[]>([])
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null)
  const [weeklyInsights, setWeeklyInsights] = useState<WeeklyInsights | null>(null)
  const [adaptiveModel, setAdaptiveModel] = useState<AdaptiveLearningModel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to safely fetch JSON data
  const safeJsonFetch = async (url: string, options = {}) => {
    try {
      const response = await fetch(url, options)

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API error (${response.status}): ${errorText}`)
      }

      // Check content type to ensure we're getting JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error(`Expected JSON but got ${contentType}: ${text.substring(0, 100)}...`)
        // Try to parse it anyway if it looks like JSON
        if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
          return JSON.parse(text)
        }
        throw new Error(`Expected JSON but got ${contentType || "unknown content type"}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error)
      throw error
    }
  }

  const refreshUserProfile = async () => {
    try {
      const data = await safeJsonFetch("/api/user-profile")
      setUserProfile(data)
    } catch (error) {
      console.error("Error fetching user profile:", error)
      setError(`Error fetching user profile: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const refreshTheTalkData = async () => {
    try {
      const data = await safeJsonFetch("/api/the-talk")
      setTheTalkData(data)
    } catch (error) {
      console.error("Error fetching The Talk data:", error)
      // Don't set error state for non-critical data
    }
  }

  const refreshDiscProfile = async () => {
    try {
      const data = await safeJsonFetch("/api/disc-profile")
      setDiscProfile(data)
    } catch (error) {
      console.error("Error fetching DISC profile:", error)
      // Don't set error state for non-critical data
    }
  }

  const refreshLearningStyle = async () => {
    try {
      const data = await safeJsonFetch("/api/learning-style")
      setLearningStyle(data)
    } catch (error) {
      console.error("Error fetching learning style:", error)
      // Don't set error state for non-critical data
    }
  }

  const refreshViaData = async () => {
    try {
      const data = await safeJsonFetch("/api/via-data")
      setViaData(data)
    } catch (error) {
      console.error("Error fetching VIA data:", error)
      // Don't set error state for non-critical data
    }
  }

  const refreshMoodEntries = async () => {
    try {
      const data = await safeJsonFetch("/api/mood")
      setMoodEntries(data)
    } catch (error) {
      console.error("Error fetching mood entries:", error)
      // Don't set error state for non-critical data
    }
  }

  const refreshProgressData = async () => {
    try {
      const data = await safeJsonFetch("/api/progress")
      setProgressData(data)
    } catch (error) {
      console.error("Error fetching progress data:", error)
      // Don't set error state for non-critical data
    }
  }

  const refreshLessonFeedback = async () => {
    try {
      const data = await safeJsonFetch("/api/lesson-feedback")
      setLessonFeedback(data)
    } catch (error) {
      console.error("Error fetching lesson feedback:", error)
      // Don't set error state for non-critical data
    }
  }

  const refreshUserPreferences = async () => {
    try {
      const data = await safeJsonFetch("/api/user-preferences")
      setUserPreferences(data)
    } catch (error) {
      console.error("Error fetching user preferences:", error)
      // For user preferences, we'll provide a default if there's an error
      setUserPreferences({
        id: "default",
        userId: "user123",
        theme: "light",
        notificationsEnabled: true,
        emailFrequency: "weekly",
        contentLevel: "intermediate",
        focusAreas: ["grammar", "vocabulary"],
        accessibility: {
          fontSize: "medium",
          highContrast: false,
          screenReader: false,
        },
      })
    }
  }

  const refreshWeeklyInsights = async () => {
    try {
      const data = await safeJsonFetch("/api/weekly-insights")
      setWeeklyInsights(data)
    } catch (error) {
      console.error("Error fetching weekly insights:", error)
      // Don't set error state for non-critical data
    }
  }

  const refreshAdaptiveModel = async () => {
    try {
      const data = await safeJsonFetch("/api/adaptive-model")
      setAdaptiveModel(data)
    } catch (error) {
      console.error("Error fetching adaptive model:", error)
      // Don't set error state for non-critical data
    }
  }

  const initializeData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Use Promise.allSettled to continue even if some requests fail
      const results = await Promise.allSettled([
        refreshUserProfile(),
        refreshTheTalkData(),
        refreshDiscProfile(),
        refreshLearningStyle(),
        refreshViaData(),
        refreshMoodEntries(),
        refreshProgressData(),
        refreshLessonFeedback(),
        refreshUserPreferences(),
        refreshWeeklyInsights(),
        refreshAdaptiveModel(),
      ])

      // Check for any rejected promises and log them
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Failed to fetch data for endpoint ${index}:`, result.reason)
        }
      })
    } catch (error) {
      console.error("Error initializing data:", error)
      setError(`Error initializing data: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    await initializeData()
  }

  const submitMoodEntry = async (entry: Omit<MoodEntry, "id" | "timestamp">) => {
    try {
      await safeJsonFetch("/api/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      })

      await refreshMoodEntries()
    } catch (error) {
      console.error("Error submitting mood entry:", error)
      setError(`Error submitting mood entry: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const submitLessonFeedback = async (feedback: Omit<LessonFeedback, "id" | "timestamp">) => {
    try {
      await safeJsonFetch("/api/lesson-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      })

      await refreshLessonFeedback()
    } catch (error) {
      console.error("Error submitting lesson feedback:", error)
      setError(`Error submitting lesson feedback: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const updateUserPreferences = async (preferences: Partial<UserPreferences>) => {
    try {
      await safeJsonFetch("/api/user-preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      })

      await refreshUserPreferences()
    } catch (error) {
      console.error("Error updating user preferences:", error)
      setError(`Error updating user preferences: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const updateProgressData = async (progress: Partial<ProgressData>) => {
    try {
      await safeJsonFetch("/api/progress", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(progress),
      })

      await refreshProgressData()
    } catch (error) {
      console.error("Error updating progress data:", error)
      setError(`Error updating progress data: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  useEffect(() => {
    initializeData()
  }, [])

  return (
    <UserDataContext.Provider
      value={{
        userProfile,
        theTalkData,
        discProfile,
        learningStyle,
        viaData,
        moodEntries,
        progressData,
        lessonFeedback,
        userPreferences,
        weeklyInsights,
        adaptiveModel,
        isLoading,
        error,
        refreshData,
        submitMoodEntry,
        submitLessonFeedback,
        updateUserPreferences,
        updateProgressData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

