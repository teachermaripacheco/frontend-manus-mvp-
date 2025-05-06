"use client"

import { useParams } from "next/navigation"
import { VideoLessonInterface } from "@/components/video-lesson-interface"

// Mock data for lessons
const LESSONS = {
  "lesson-1": {
    id: "lesson-1",
    title: "Past Tense Conversation Practice",
    teacherName: "Sofia Chen",
    teacherAvatar: "/placeholder.svg?height=400&width=400",
    studentProfile: {
      learningStyle: "Visual-Auditory",
      emotionalState: "Confident",
      currentLevel: "Intermediate",
      focusAreas: ["Past Tense", "Conversation", "Listening Comprehension"],
    },
  },
  "lesson-2": {
    id: "lesson-2",
    title: "Future Tense and Planning",
    teacherName: "Miguel Rodriguez",
    teacherAvatar: "/placeholder.svg?height=400&width=400",
    studentProfile: {
      learningStyle: "Kinesthetic",
      emotionalState: "Anxious",
      currentLevel: "Beginner",
      focusAreas: ["Future Tense", "Vocabulary", "Speaking Practice"],
    },
  },
  "lesson-3": {
    id: "lesson-3",
    title: "Advanced Conversation: Current Events",
    teacherName: "Aisha Johnson",
    teacherAvatar: "/placeholder.svg?height=400&width=400",
    studentProfile: {
      learningStyle: "Logical-Verbal",
      emotionalState: "Motivated",
      currentLevel: "Advanced",
      focusAreas: ["Fluency", "Complex Sentences", "Cultural Context"],
    },
  },
}

export default function VideoLessonPage() {
  const params = useParams()
  const lessonId = params.id as string

  const lesson = LESSONS[lessonId as keyof typeof LESSONS] || {
    id: lessonId,
    title: "Language Lesson",
    teacherName: "AI Teacher",
    teacherAvatar: "/placeholder.svg?height=400&width=400",
  }

  return (
    <div className="container py-8">
      <VideoLessonInterface
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        teacherName={lesson.teacherName}
        teacherAvatar={lesson.teacherAvatar}
        studentProfile={lesson.studentProfile}
      />
    </div>
  )
}

