import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Star, Lock, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Learn | SURI AI",
  description: "Your personalized language learning path",
}

// Sample learning units data
const learningUnits = [
  {
    id: 1,
    title: "Greetings & Introductions",
    description: "Learn how to introduce yourself and greet others",
    progress: 100,
    lessons: 5,
    completed: 5,
    xp: 250,
    unlocked: true,
    topics: ["Basic greetings", "Formal introductions", "Asking questions", "Cultural norms", "Practice dialogues"],
  },
  {
    id: 2,
    title: "Daily Routines",
    description: "Talk about your everyday activities and schedule",
    progress: 80,
    lessons: 5,
    completed: 4,
    xp: 200,
    unlocked: true,
    topics: ["Morning routine", "Work activities", "Leisure time", "Telling time", "Frequency adverbs"],
  },
  {
    id: 3,
    title: "Past Tense",
    description: "Learn to talk about past events and experiences",
    progress: 40,
    lessons: 6,
    completed: 2,
    xp: 120,
    unlocked: true,
    topics: [
      "Regular verbs",
      "Irregular verbs",
      "Time expressions",
      "Asking questions",
      "Negative forms",
      "Storytelling",
    ],
  },
  {
    id: 4,
    title: "Shopping & Numbers",
    description: "Navigate shopping situations and use numbers confidently",
    progress: 0,
    lessons: 4,
    completed: 0,
    xp: 0,
    unlocked: true,
    topics: ["Store vocabulary", "Asking for prices", "Numbers 1-1000", "Making comparisons"],
  },
  {
    id: 5,
    title: "Travel & Directions",
    description: "Get around in a foreign country with confidence",
    progress: 0,
    lessons: 5,
    completed: 0,
    xp: 0,
    unlocked: false,
    topics: [
      "Transportation vocabulary",
      "Asking for directions",
      "Reading maps",
      "Making reservations",
      "Travel problems",
    ],
  },
  {
    id: 6,
    title: "Food & Dining",
    description: "Order food and discuss culinary preferences",
    progress: 0,
    lessons: 5,
    completed: 0,
    xp: 0,
    unlocked: false,
    topics: ["Restaurant vocabulary", "Ordering food", "Describing tastes", "Cultural dining customs", "Recipes"],
  },
]

export default function LearnPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Learning Path</h1>
          <p className="text-muted-foreground">Master your language skills step by step</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-suri-blue hover:bg-suri-blue/80 text-white">
            <ArrowRight className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {learningUnits.map((unit) => (
          <Card key={unit.id} className={unit.unlocked ? "" : "opacity-75"}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{unit.title}</CardTitle>
                  <CardDescription>{unit.description}</CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-amber-500" />
                  <span className="font-medium">{unit.xp} XP</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    {unit.completed}/{unit.lessons} lessons completed
                  </span>
                  <span>{unit.progress}%</span>
                </div>
                <Progress value={unit.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {unit.topics.map((topic, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border flex items-center ${
                      index < unit.completed
                        ? "bg-green-50 border-green-200"
                        : !unit.unlocked
                          ? "bg-muted/20"
                          : "hover:bg-muted/10"
                    }`}
                  >
                    {index < unit.completed ? (
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    ) : !unit.unlocked ? (
                      <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                    ) : (
                      <BookOpen className="h-4 w-4 mr-2 text-suri-blue" />
                    )}
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                {unit.progress === 100 ? (
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Completed
                  </Badge>
                ) : unit.progress > 0 ? (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>
                ) : unit.unlocked ? (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-300">Not Started</Badge>
                ) : (
                  <Badge variant="outline" className="bg-muted">
                    <Lock className="h-4 w-4 mr-1" />
                    Locked
                  </Badge>
                )}

                {unit.unlocked && (
                  <Link href={`/learn/unit/${unit.id}`}>
                    <Button
                      size="sm"
                      className={
                        unit.progress === 100 ? "bg-green-600 hover:bg-green-700" : "bg-suri-blue hover:bg-suri-blue/80"
                      }
                      disabled={!unit.unlocked}
                    >
                      {unit.progress === 100 ? "Review" : unit.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

