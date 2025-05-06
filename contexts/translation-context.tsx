"use client"

import { createContext, useContext, type ReactNode, useState } from "react"

// Define the translation interface
interface Translations {
  [key: string]: string
}

// English translations
const enTranslations: Translations = {
  welcome: "Welcome to SURI AI",
  getStarted: "Get Started",
  learnMore: "Learn More",
  login: "Log In",
  signup: "Sign Up",
  features: "Features",
  pricing: "Pricing",
  about: "About",
  contact: "Contact",
  personalizedOnboarding: "Personalized Onboarding",
  onboardingDesc: "We analyze your learning style, personality, and goals to create your unique profile.",
  adaptiveLearning: "Adaptive Learning Path",
  adaptiveDesc: "Your content adapts in real-time based on your progress, emotional state, and learning patterns.",
  interactivePractice: "Interactive Practice",
  practiceDesc: "Engage in natural conversations with our AI or schedule sessions with human mentors.",
  continuousGrowth: "Continuous Growth",
  growthDesc: "Track your progress, receive emotional insights, and celebrate your language learning journey.",
}

// Portuguese translations
const ptTranslations: Translations = {
  welcome: "Bem-vindo ao SURI AI",
  getStarted: "Começar",
  learnMore: "Saiba Mais",
  login: "Entrar",
  signup: "Registrar",
  features: "Recursos",
  pricing: "Preços",
  about: "Sobre",
  contact: "Contato",
  personalizedOnboarding: "Onboarding Personalizado",
  onboardingDesc: "Analisamos seu estilo de aprendizado, personalidade e objetivos para criar seu perfil único.",
  adaptiveLearning: "Caminho de Aprendizado Adaptativo",
  adaptiveDesc:
    "Seu conteúdo se adapta em tempo real com base em seu progresso, estado emocional e padrões de aprendizado.",
  interactivePractice: "Prática Interativa",
  practiceDesc: "Participe de conversas naturais com nossa IA ou agende sessões com mentores humanos.",
  continuousGrowth: "Crescimento Contínuo",
  growthDesc: "Acompanhe seu progresso, receba insights emocionais e celebre sua jornada de aprendizado de idiomas.",
}

// Available languages
type Language = "en" | "pt"

// Translation context type
interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translate: (key: string) => string
}

// Create the context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Provider component
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Translation function
  const translate = (key: string): string => {
    const translations = language === "en" ? enTranslations : ptTranslations
    return translations[key] || key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>{children}</TranslationContext.Provider>
  )
}

// Hook to use the translation context
export function useTranslation() {
  const context = useContext(TranslationContext)

  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }

  return context
}

