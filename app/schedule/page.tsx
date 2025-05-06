import type { Metadata } from "next"
import { LessonCard } from "@/components/lesson-card"
import { addDays } from "date-fns"

export const metadata: Metadata = {
  title: "Schedule Lessons | SURI AI",
  description: "Browse and schedule your language learning lessons",
}

export default function SchedulePage() {
  // Sample lessons data
  const lessons = [
    {
      id: "video-1",
      title: "Business English: Negotiation Skills",
      description: "Learn key phrases and strategies for effective business negotiations in English.",
      type: "video" as const,
      date: addDays(new Date(), 2),
      duration: 45,
      teacher: "Sarah Johnson",
      level: "intermediate" as const,
    },
    {
      id: "grammar-1",
      title: "Grammar Focus: Conditional Sentences",
      description: "Master the different types of conditional sentences in English.",
      type: "grammar" as const,
      date: addDays(new Date(), 3),
      duration: 30,
      teacher: "Michael Chen",
      level: "beginner" as const,
    },
    {
      id: "conversation-1",
      title: "Conversation Practice: Job Interviews",
      description: "Practice common job interview questions and improve your responses.",
      type: "conversation" as const,
      date: addDays(new Date(), 4),
      duration: 60,
      teacher: "Emma Rodriguez",
      level: "intermediate" as const,
    },
    {
      id: "pronunciation-1",
      title: "Pronunciation Workshop: Difficult Sounds",
      description: "Focus on the most challenging English sounds for non-native speakers.",
      type: "pronunciation" as const,
      date: addDays(new Date(), 5),
      duration: 45,
      teacher: "David Thompson",
      level: "advanced" as const,
    },
    {
      id: "video-2",
      title: "Travel English: Airport and Transportation",
      description: "Essential vocabulary and phrases for navigating airports and public transportation.",
      type: "video" as const,
      date: addDays(new Date(), 6),
      duration: 45,
      teacher: "Lisa Wang",
      level: "beginner" as const,
    },
    {
      id: "grammar-2",
      title: "Grammar Focus: Perfect Tenses",
      description: "A comprehensive look at present perfect, past perfect, and future perfect tenses.",
      type: "grammar" as const,
      date: addDays(new Date(), 7),
      duration: 30,
      teacher: "Robert Garcia",
      level: "intermediate" as const,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Schedule Lessons</h1>
      <p className="text-gray-600 mb-8">Browse available lessons and add them to your calendar</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            description={lesson.description}
            type={lesson.type}
            date={lesson.date}
            duration={lesson.duration}
            teacher={lesson.teacher}
            level={lesson.level}
          />
        ))}
      </div>
    </div>
  )
}

