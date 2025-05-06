"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type DiscProfile = "D" | "I" | "S" | "C" | "D/I" | "D/C" | "I/S" | "S/C" | "C/S"

export type LearningStyle = "Visual" | "Auditory" | "Kinesthetic" | "Reading/Writing"

export interface UserProfile {
  id?: string
  email?: string
  name?: string
  avatar?: string
  nativeLanguage?: string
  learningLanguage?: string
  level?: string
  goals?: string[]
  discProfile?: DiscProfile
  learningStyle?: LearningStyle
  emotionalNeeds?: string[]
  streak?: number
  completedOnboarding?: boolean
  startDate?: string
}

interface UserContextType {
  user: UserProfile | null
  isLoading: boolean
  login: (userData: Partial<UserProfile>) => void
  logout: () => void
  updateProfile: (data: Partial<UserProfile>) => void
  setOnboardingComplete: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("suri_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("suri_user", JSON.stringify(user))
    }
  }, [user])

  const login = (userData: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      ...userData,
      id: userData.id || `user_${Date.now()}`,
      startDate: new Date().toISOString(),
      streak: 0,
      completedOnboarding: false,
    }
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem("suri_user")
    setUser(null)
  }

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null
      return { ...prev, ...data }
    })
  }

  const setOnboardingComplete = () => {
    setUser((prev) => {
      if (!prev) return null
      return { ...prev, completedOnboarding: true }
    })
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, updateProfile, setOnboardingComplete }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

