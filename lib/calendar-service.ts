import { addDays, format } from "date-fns"

export type CalendarProvider = "google" | "apple"

export interface LessonDetails {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  location?: string
  teacherName?: string
  lessonType: "video" | "grammar" | "conversation" | "pronunciation"
}

// Function to generate Google Calendar event URL
export function generateGoogleCalendarUrl(lesson: LessonDetails): string {
  const startTime = format(lesson.startTime, "yyyyMMdd'T'HHmmss")
  const endTime = format(lesson.endTime, "yyyyMMdd'T'HHmmss")

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: lesson.title,
    details: lesson.description,
    dates: `${startTime}/${endTime}`,
    location: lesson.location || "Online Lesson",
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// Function to generate Apple Calendar .ics file content
export function generateIcsFileContent(lesson: LessonDetails): string {
  const startTime = format(lesson.startTime, "yyyyMMdd'T'HHmmss")
  const endTime = format(lesson.endTime, "yyyyMMdd'T'HHmmss")
  const now = format(new Date(), "yyyyMMdd'T'HHmmss")

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SURI AI//Language Learning//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${lesson.title}
DTSTART:${startTime}
DTEND:${endTime}
DTSTAMP:${now}
UID:${lesson.id}@suri.ai
DESCRIPTION:${lesson.description.replace(/\n/g, "\\n")}
LOCATION:${lesson.location || "Online Lesson"}
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder for your SURI AI lesson
TRIGGER:-PT30M
END:VALARM
END:VEVENT
END:VCALENDAR`
}

// Function to generate sample upcoming lessons
export function generateSampleUpcomingLessons(): LessonDetails[] {
  const now = new Date()

  return [
    {
      id: "lesson-1",
      title: "Business English: Negotiation Skills",
      description: "Learn key phrases and strategies for effective business negotiations in English.",
      startTime: addDays(now, 1),
      endTime: addDays(new Date(now.getTime() + 45 * 60000), 1),
      teacherName: "Sarah Johnson",
      lessonType: "video",
    },
    {
      id: "lesson-2",
      title: "Grammar Focus: Conditional Sentences",
      description: "Master the different types of conditional sentences in English.",
      startTime: addDays(now, 3),
      endTime: addDays(new Date(now.getTime() + 30 * 60000), 3),
      teacherName: "Michael Chen",
      lessonType: "grammar",
    },
    {
      id: "lesson-3",
      title: "Conversation Practice: Job Interviews",
      description: "Practice common job interview questions and improve your responses.",
      startTime: addDays(now, 5),
      endTime: addDays(new Date(now.getTime() + 60 * 60000), 5),
      teacherName: "Emma Rodriguez",
      lessonType: "conversation",
    },
  ]
}

