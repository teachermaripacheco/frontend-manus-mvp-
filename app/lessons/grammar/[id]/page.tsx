"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowRight, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

// Mock data for grammar lessons
const GRAMMAR_LESSONS = {
  "grammar-1": {
    id: "grammar-1",
    title: "Past Simple vs. Past Continuous",
    level: "intermediate",
    sections: [
      {
        title: "Introduction",
        content: `
          <h3>Past Simple vs. Past Continuous</h3>
          <p>In this lesson, we'll learn the difference between these two important past tenses in English.</p>
          <p>By the end of this lesson, you'll be able to:</p>
          <ul>
            <li>Form past simple and past continuous sentences correctly</li>
            <li>Understand when to use each tense</li>
            <li>Use both tenses together in complex sentences</li>
          </ul>
        `,
      },
      {
        title: "Past Simple",
        content: `
          <h3>The Past Simple Tense</h3>
          <p>We use the past simple to talk about completed actions in the past.</p>
          <div class="example">
            <p><strong>Example:</strong> I <span class="highlight">walked</span> to school yesterday.</p>
          </div>
          <h4>Regular Verbs</h4>
          <p>For regular verbs, we add -ed to the base form:</p>
          <ul>
            <li>walk → walked</li>
            <li>talk → talked</li>
            <li>play → played</li>
          </ul>
          <h4>Irregular Verbs</h4>
          <p>Irregular verbs have special past forms:</p>
          <ul>
            <li>go → went</li>
            <li>see → saw</li>
            <li>eat → ate</li>
          </ul>
        `,
      },
      {
        title: "Past Continuous",
        content: `
          <h3>The Past Continuous Tense</h3>
          <p>We use the past continuous to talk about actions that were in progress at a specific time in the past.</p>
          <div class="example">
            <p><strong>Example:</strong> I <span class="highlight">was walking</span> to school when it started to rain.</p>
          </div>
          <h4>Form</h4>
          <p>was/were + verb-ing</p>
          <ul>
            <li>I/he/she/it <strong>was</strong> walking</li>
            <li>You/we/they <strong>were</strong> walking</li>
          </ul>
        `,
      },
      {
        title: "Comparing Uses",
        content: `
          <h3>When to Use Each Tense</h3>
          <p>Use <strong>past simple</strong> for:</p>
          <ul>
            <li>Completed actions in the past</li>
            <li>A series of completed actions</li>
            <li>Actions that happened at a specific time</li>
          </ul>
          <p>Use <strong>past continuous</strong> for:</p>
          <ul>
            <li>Actions in progress at a specific time in the past</li>
            <li>Background actions (setting the scene)</li>
            <li>Actions interrupted by another action (with past simple)</li>
          </ul>
          <div class="example">
            <p><strong>Example:</strong> I <span class="highlight">was studying</span> when she <span class="highlight">called</span>.</p>
            <p><em>(past continuous for the action in progress, past simple for the interruption)</em></p>
          </div>
        `,
      },
      {
        title: "Practice",
        content: `
          <h3>Practice Exercises</h3>
          <p>Complete the sentences with the correct form of the verbs.</p>
          <div class="exercise">
            <p>1. While I ________ (walk) home, I ________ (see) an old friend.</p>
            <p>2. She ________ (not/study) when I ________ (call) her.</p>
            <p>3. What ________ you ________ (do) at 8 PM last night?</p>
            <p>4. They ________ (watch) TV when the power ________ (go) out.</p>
          </div>
          <button class="check-answers">Check Answers</button>
        `,
      },
    ],
    alternateOptions: [
      {
        id: "video-1",
        title: "Visual Guide to Past Tenses",
        type: "video",
        reason: "Learn through visual examples and conversation",
      },
      {
        id: "conversation-1",
        title: "Talking About Your Weekend",
        type: "conversation",
        reason: "Practice past tenses in a relaxed conversation",
      },
    ],
  },
  "grammar-2": {
    id: "grammar-2",
    title: "Conditional Sentences: If Clauses",
    level: "advanced",
    sections: [
      {
        title: "Introduction",
        content: `
          <h3>Conditional Sentences</h3>
          <p>In this lesson, we'll learn about conditional sentences (if clauses) in English.</p>
        `,
      },
      // Additional sections would be here
    ],
  },
}

export default function GrammarLessonPage() {
  const params = useParams()
  const lessonId = params.id as string
  const [currentSection, setCurrentSection] = useState(0)
  const [progress, setProgress] = useState(0)

  const lesson = GRAMMAR_LESSONS[lessonId as keyof typeof GRAMMAR_LESSONS] || {
    id: lessonId,
    title: "Grammar Lesson",
    level: "intermediate",
    sections: [
      {
        title: "Content",
        content: "Lesson content not found.",
      },
    ],
  }

  const handleNextSection = () => {
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setProgress(((currentSection + 1) / (lesson.sections.length - 1)) * 100)
    }
  }

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setProgress(((currentSection - 1) / (lesson.sections.length - 1)) * 100)
    }
  }

  return (
    <div className="container py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-suri-blue/10 to-suri-teal/10 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-suri-blue" />
              <h2 className="font-medium text-lg">{lesson.title}</h2>
            </div>
            <Badge
              variant="outline"
              className={
                lesson.level === "beginner"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : lesson.level === "intermediate"
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-purple-100 text-purple-800 border-purple-200"
              }
            >
              {lesson.level}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-b">
            <div className="flex overflow-x-auto p-2">
              {lesson.sections.map((section, index) => (
                <Button
                  key={index}
                  variant={currentSection === index ? "default" : "ghost"}
                  className={`mr-2 whitespace-nowrap ${
                    currentSection === index ? "bg-suri-blue hover:bg-suri-blue/80" : ""
                  }`}
                  onClick={() => {
                    setCurrentSection(index)
                    setProgress((index / (lesson.sections.length - 1)) * 100)
                  }}
                >
                  {index + 1}. {section.title}
                </Button>
              ))}
            </div>
            <div className="px-4 py-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <div className="p-6">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.sections[currentSection].content }}
            />

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevSection} disabled={currentSection === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNextSection}
                disabled={currentSection === lesson.sections.length - 1}
                className="bg-suri-blue hover:bg-suri-blue/80"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

