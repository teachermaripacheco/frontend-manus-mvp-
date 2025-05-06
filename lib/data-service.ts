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
} from "./db-schema"

import {
  mockUserProfile,
  mockTheTalkData,
  mockDISCProfile,
  mockLearningStyle,
  mockVIAData,
  mockMoodEntries,
  mockProgressData,
  mockLessonFeedback,
  mockUserPreferences,
  mockWeeklyInsights,
  mockAdaptiveModel,
} from "./mock-db"

// User Profile
export async function getUserProfile(): Promise<UserProfile> {
  return mockUserProfile
}

export async function updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  Object.assign(mockUserProfile, data)
  return mockUserProfile
}

// The Talk Data
export async function getTheTalkData(): Promise<TheTalkData> {
  return mockTheTalkData
}

export async function updateTheTalkData(data: Partial<TheTalkData>): Promise<TheTalkData> {
  Object.assign(mockTheTalkData, data)
  return mockTheTalkData
}

// DISC Profile
export async function getDISCProfile(): Promise<DISCProfile> {
  return mockDISCProfile
}

export async function updateDISCProfile(data: Partial<DISCProfile>): Promise<DISCProfile> {
  Object.assign(mockDISCProfile, data)
  return mockDISCProfile
}

// Learning Style
export async function getLearningStyle(): Promise<LearningStyle> {
  return mockLearningStyle
}

export async function updateLearningStyle(data: Partial<LearningStyle>): Promise<LearningStyle> {
  Object.assign(mockLearningStyle, data)
  return mockLearningStyle
}

// VIA Data
export async function getVIAData(): Promise<VIAData> {
  return mockVIAData
}

export async function updateVIAData(data: Partial<VIAData>): Promise<VIAData> {
  Object.assign(mockVIAData, data)
  return mockVIAData
}

// Mood Entries
export async function getMoodEntries(): Promise<MoodEntry[]> {
  return mockMoodEntries
}

export async function addMoodEntry(entry: Omit<MoodEntry, "id" | "timestamp">): Promise<MoodEntry> {
  const newEntry: MoodEntry = {
    id: `mood_${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...entry,
  }
  mockMoodEntries.push(newEntry)
  return newEntry
}

// Progress Data
export async function getProgressData(): Promise<ProgressData> {
  return mockProgressData
}

export async function updateProgressData(data: Partial<ProgressData>): Promise<ProgressData> {
  Object.assign(mockProgressData, data)
  return mockProgressData
}

// Lesson Feedback
export async function getLessonFeedback(): Promise<LessonFeedback[]> {
  return mockLessonFeedback
}

export async function addLessonFeedback(feedback: Omit<LessonFeedback, "id" | "timestamp">): Promise<LessonFeedback> {
  const newFeedback: LessonFeedback = {
    id: `feedback_${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...feedback,
  }
  mockLessonFeedback.push(newFeedback)
  return newFeedback
}

// User Preferences
export async function getUserPreferences(): Promise<UserPreferences> {
  return mockUserPreferences
}

export async function updateUserPreferences(data: Partial<UserPreferences>): Promise<UserPreferences> {
  Object.assign(mockUserPreferences, data)
  return mockUserPreferences
}

// Weekly Insights
export async function getWeeklyInsights(): Promise<WeeklyInsights> {
  return mockWeeklyInsights
}

export async function generateWeeklyInsights(): Promise<WeeklyInsights> {
  // In a real implementation, this would analyze user data and generate insights
  // For now, we'll just return the mock data
  return mockWeeklyInsights
}

// Adaptive Learning Model
export async function getAdaptiveModel(): Promise<AdaptiveLearningModel> {
  return mockAdaptiveModel
}

export async function updateAdaptiveModel(): Promise<AdaptiveLearningModel> {
  // In a real implementation, this would update the model based on user data
  // For now, we'll just return the mock data
  return mockAdaptiveModel
}

