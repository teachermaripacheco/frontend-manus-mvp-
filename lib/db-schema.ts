// User Profile
export interface UserProfile {
  id: string
  name: string
  email: string
  language: string
  level: string
  joinDate: string
  lastActive: string
  totalLessonsCompleted: number
  totalTimeSpent: number // in minutes
  streak: number
  avatarUrl: string
}

// The Talk Data
export interface TheTalkData {
  id: string
  userId: string
  completionDate: string
  primaryMotivation: string
  learningGoals: string[]
  timeCommitment: string
  preferredLearningTime: string
  challengeAreas: string[]
  strengthAreas: string[]
}

// DISC Profile
export interface DISCProfile {
  id: string
  userId: string
  dominance: number // 0-1 scale
  influence: number // 0-1 scale
  steadiness: number // 0-1 scale
  conscientiousness: number // 0-1 scale
  primaryStyle: string
  secondaryStyle: string
  learningImplications: string[]
  completionDate: string
}

// Learning Style
export interface LearningStyle {
  id: string
  userId: string
  visual: number // 0-1 scale
  auditory: number // 0-1 scale
  readWrite: number // 0-1 scale
  kinesthetic: number // 0-1 scale
  primaryStyle: string
  secondaryStyle: string
  recommendations: string[]
  completionDate: string
}

// VIA Character Strengths
export interface VIAData {
  id: string
  userId: string
  topStrengths: string[]
  strengthScores: Record<string, number> // 0-1 scale
  learningApplications: string[]
  completionDate: string
}

// Mood Tracking
export interface MoodEntry {
  id: string
  userId: string
  timestamp: string
  mood: string
  energy: number // 0-1 scale
  stress: number // 0-1 scale
  notes?: string
}

// Progress Tracking
export interface Milestone {
  id: string
  title: string
  date: string
}

export interface ProgressData {
  id: string
  userId: string
  overallProgress: number // 0-1 scale
  skillLevels: Record<string, number> // 0-1 scale
  recentMilestones: Milestone[]
  weakAreas: string[]
  strongAreas: string[]
  recommendedFocus: string[]
}

// Lesson Feedback
export interface LessonFeedback {
  id: string
  userId: string
  lessonId: string
  timestamp: string
  rating: number // 1-5 scale
  difficulty: number // 1-5 scale
  engagement: number // 1-5 scale
  comprehension: number // 1-5 scale
  comments?: string
}

// User Preferences
export interface UserPreferences {
  id: string
  userId: string
  theme: "light" | "dark" | "system"
  notificationsEnabled: boolean
  emailFrequency: "daily" | "weekly" | "monthly" | "never"
  contentLevel: "beginner" | "intermediate" | "advanced"
  focusAreas: string[]
  accessibility: {
    fontSize: "small" | "medium" | "large"
    highContrast: boolean
    screenReader: boolean
  }
}

// Weekly Insights
export interface WeeklyInsights {
  id: string
  userId: string
  weekStarting: string
  weekEnding: string
  timeSpent: number // minutes
  lessonsCompleted: number
  skillImprovements: Record<string, number> // skill name to improvement amount (0-1 scale)
  moodTrend: string
  focusAreaProgress: Record<string, number> // focus area to progress amount (0-1 scale)
  recommendations: string[]
}

// Adaptive Learning Model
export interface AdaptiveLearningModel {
  id: string
  userId: string
  lastUpdated: string
  contentPreferences: Record<string, number> // content type to preference score (0-1 scale)
  optimalLearningTimes: string[]
  attentionSpan: number // minutes
  retentionFactors: Record<string, number> // factor to effectiveness score (0-1 scale)
  personalizedTips: string[]
}

