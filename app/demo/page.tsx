"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Heart, MessageSquare, Video } from "lucide-react"
import { VideoLessonInterface } from "@/components/video-lesson-interface"
import { AIChatInterface } from "@/components/ai-chat-interface"
import { RealTimeEmotionalFeedback } from "@/components/real-time-emotional-feedback"

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState("video")

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Experience SURI AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our interactive demos to see how SURI AI transforms language learning with emotional intelligence.
          </p>
        </div>

        <Tabs defaultValue={activeDemo} value={activeDemo} onValueChange={setActiveDemo} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="video">Video Lesson</TabsTrigger>
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="emotional">Emotional AI</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="video" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-suri-blue" />
                  Interactive Video Lesson
                </CardTitle>
                <CardDescription>
                  Experience a video lesson with our AI language mentor that adapts to your learning style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoLessonInterface
                  lessonId="demo-1"
                  lessonTitle="Conversation Practice: Daily Routines"
                  teacherName="SURI AI"
                  teacherAvatar="/placeholder.svg?height=400&width=400&text=🧠"
                  studentProfile={{
                    learningStyle: "Visual",
                    emotionalState: "Slightly anxious",
                    currentLevel: "Intermediate",
                    discProfile: "S/C",
                    focusAreas: ["Speaking confidence", "Vocabulary", "Grammar"],
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  This demo shows how SURI adapts to your emotional state during a video lesson
                </p>
                <Button onClick={() => setActiveDemo("chat")}>
                  Next Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-suri-blue" />
                  AI Chat Interface
                </CardTitle>
                <CardDescription>
                  Chat with our emotionally intelligent AI that understands your learning needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIChatInterface />
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  This demo showcases our AI chat capabilities with emotional intelligence
                </p>
                <Button onClick={() => setActiveDemo("emotional")}>
                  Next Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="emotional" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-suri-rose" />
                  Real-Time Emotional Feedback
                </CardTitle>
                <CardDescription>
                  See how SURI AI detects and responds to your emotional state during learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RealTimeEmotionalFeedback />
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  This demo shows how we track and respond to your emotional state in real-time
                </p>
                <Button onClick={() => setActiveDemo("video")}>
                  Back to First Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sign up now to experience the full power of SURI AI's emotionally intelligent language learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-suri-blue hover:bg-suri-blue/80 text-white">
              <Link href="/signup">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

