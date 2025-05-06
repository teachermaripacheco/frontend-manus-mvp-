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

// Mock User Profile
export const mockUserProfile: UserProfile = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex@example.com",
  language: "English",
  level: "Intermediate",
  joinDate: "2023-01-15T00:00:00.000Z",
  lastActive: "2023-04-01T10:30:00.000Z",
  totalLessonsCompleted: 42,
  totalTimeSpent: 3600, // in minutes
  streak: 15,
  avatarUrl: "/placeholder.svg?height=100&width=100",
}

// Mock The Talk Data
export const mockTheTalkData: TheTalkData = {
  id: "talk123",
  userId: "user123",
  completionDate: "2023-02-10T00:00:00.000Z",
  primaryMotivation: "Career advancement",
  learningGoals: ["Fluent conversations", "Business writing"],
  timeCommitment: "Medium (5-10 hours/week)",
  preferredLearningTime: "Morning",
  challengeAreas: ["Speaking confidence", "Grammar"],
  strengthAreas: ["Reading comprehension", "Vocabulary"],
}

// Mock DISC Profile
export const mockDISCProfile: DISCProfile = {
  id: "disc123",
  userId: "user123",
  dominance: 0.7,
  influence: 0.5,
  steadiness: 0.3,
  conscientiousness: 0.8,
  primaryStyle: "Conscientiousness",
  secondaryStyle: "Dominance",
  learningImplications: [
    "Prefers structured learning environments",
    "Detail-oriented, may focus on perfection",
    "Enjoys problem-solving and analytical tasks",
  ],
  completionDate: "2023-02-15T00:00:00.000Z",
}

// Mock Learning Style
export const mockLearningStyle: LearningStyle = {
  id: "ls123",
  userId: "user123",
  visual: 0.8,
  auditory: 0.4,
  readWrite: 0.6,
  kinesthetic: 0.3,
  primaryStyle: "Visual",
  secondaryStyle: "Read/Write",
  recommendations: ["Use diagrams and charts", "Watch video demonstrations", "Take detailed notes"],
  completionDate: "2023-02-20T00:00:00.000Z",
}

// Mock VIA Character Strengths
export const mockVIAData: VIAData = {
  id: "via123",
  userId: "user123",
  topStrengths: ["Curiosity", "Love of Learning", "Perseverance", "Creativity", "Judgment"],
  strengthScores: {
    Curiosity: 0.9,
    "Love of Learning": 0.85,
    Perseverance: 0.8,
    Creativity: 0.75,
    Judgment: 0.7,
  },
  learningApplications: [
    "Leverage curiosity by exploring diverse topics",
    "Set challenging but achievable goals to utilize perseverance",
    "Apply creative thinking to language practice",
  ],
  completionDate: "2023-02-25T00:00:00.000Z",
}

// Mock Mood Entries
export const mockMoodEntries: MoodEntry[] = [
  {
    id: "mood1",
    userId: "user123",
    timestamp: "2023-03-25T09:15:00.000Z",
    mood: "Motivated",
    energy: 0.8,
    stress: 0.3,
    notes: "Feeling ready to tackle difficult grammar concepts today.",
  },
  {
    id: "mood2",
    userId: "user123",
    timestamp: "2023-03-26T14:30:00.000Z",
    mood: "Frustrated",
    energy: 0.4,
    stress: 0.7,
    notes: "Struggling with subjunctive tense exercises.",
  },
  {
    id: "mood3",
    userId: "user123",
    timestamp: "2023-03-27T19:45:00.000Z",
    mood: "Accomplished",
    energy: 0.6,
    stress: 0.2,
    notes: "Successfully completed a conversation practice with a native speaker.",
  },
]

// Mock Progress Data
export const mockProgressData: ProgressData = {
  id: "progress123",
  userId: "user123",
  overallProgress: 0.65,
  skillLevels: {
    Listening: 0.7,
    Speaking: 0.6,
    Reading: 0.8,
    Writing: 0.6,
    Grammar: 0.5,
    Vocabulary: 0.7,
  },
  recentMilestones: [
    {
      id: "milestone1",
      title: "Completed Intermediate Grammar Module",
      date: "2023-03-20T00:00:00.000Z",
    },
    {
      id: "milestone2",
      title: "First 30-minute conversation without pauses",
      date: "2023-03-15T00:00:00.000Z",
    },
  ],
  weakAreas: ["Subjunctive tense", "Idiomatic expressions"],
  strongAreas: ["Present tense conjugation", "Basic vocabulary"],
  recommendedFocus: ["Practice subjunctive tense", "Learn common idioms"],
}

// Mock Lesson Feedback
export const mockLessonFeedback: LessonFeedback[] = [
  {
    id: "feedback1",
    userId: "user123",
    lessonId: "lesson456",
    timestamp: "2023-03-10T10:30:00.000Z",
    rating: 4,
    difficulty: 3,
    engagement: 5,
    comprehension: 4,
    comments: "Really enjoyed the interactive exercises, but some grammar explanations were confusing.",
  },
  {
    id: "feedback2",
    userId: "user123",
    lessonId: "lesson457",
    timestamp: "2023-03-12T14:15:00.000Z",
    rating: 5,
    difficulty: 4,
    engagement: 5,
    comprehension: 4,
    comments: "The role-playing scenario was very helpful for practicing real-world conversations.",
  },
]

// Mock User Preferences
export const mockUserPreferences: UserPreferences = {
  id: "pref123",
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
}

// Mock Weekly Insights
export const mockWeeklyInsights: WeeklyInsights = {
  id: "insights123",
  userId: "user123",
  weekStarting: "2023-03-20T00:00:00.000Z",
  weekEnding: "2023-03-26T23:59:59.999Z",
  timeSpent: 320, // minutes
  lessonsCompleted: 8,
  skillImprovements: {
    Listening: 0.05,
    Speaking: 0.03,
    Grammar: 0.07,
  },
  moodTrend: "Positive",
  focusAreaProgress: {
    "Subjunctive tense": 0.15,
    Vocabulary: 0.08,
  },
  recommendations: [
    "Continue focusing on subjunctive tense",
    "Try more speaking exercises to build confidence",
    "Review vocabulary from weeks 3-4",
  ],
}

// Mock Adaptive Learning Model
export const mockAdaptiveModel: AdaptiveLearningModel = {
  id: "model123",
  userId: "user123",
  lastUpdated: "2023-03-27T00:00:00.000Z",
  contentPreferences: {
    "Video lessons": 0.8,
    "Interactive exercises": 0.9,
    "Reading materials": 0.6,
    "Audio lessons": 0.5,
  },
  optimalLearningTimes: ["Morning", "Early evening"],
  attentionSpan: 25, // minutes
  retentionFactors: {
    "Spaced repetition": 0.85,
    "Contextual learning": 0.9,
    Gamification: 0.7,
  },
  personalizedTips: [
    "You learn best with visual content followed by interactive practice",
    "Short, focused sessions of 20-25 minutes are optimal for your retention",
    "Reviewing material after 24 hours significantly improves your recall",
  ],
}

