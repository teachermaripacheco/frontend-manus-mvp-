"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  Video,
  Mic,
  MessageSquare,
  Clock,
  ArrowRight,
  Sparkles,
  Brain,
  Heart,
  Headphones,
} from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { AdaptiveContentFlow } from "@/components/adaptive-content-flow"
import { EmotionalInsightTracker } from "@/components/emotional-insight-tracker"
import { AudioFeedbackHub } from "@/components/audio-feedback-hub"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function StudentDashboard() {
  const router = useRouter()
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("overview")

  // Sample upcoming lessons
  const upcomingLessons = [
    {
      id: 1,
      title: "Business English: Meeting Vocabulary",
      type: "video",
      date: "Today, 3:00 PM",
      duration: "30 min",
    },
    {
      id: 2,
      title: "Grammar Practice: Past Perfect",
      type: "grammar",
      date: "Tomorrow, 2:00 PM",
      duration: "25 min",
    },
    {
      id: 3,
      title: "Pronunciation Workshop",
      type: "speaking",
      date: "Friday, 4:00 PM",
      duration: "20 min",
    },
  ]

  // Sample recent activities
  const recentActivities = [
    {
      id: 1,
      title: "Completed Lesson: Present Continuous",
      date: "Yesterday",
      score: 85,
    },
    {
      id: 2,
      title: "Vocabulary Practice: Travel",
      date: "2 days ago",
      score: 92,
    },
    {
      id: 3,
      title: "Speaking Session with AI Mentor",
      date: "3 days ago",
      duration: "15 min",
    },
  ]

  // Get lesson type icon
  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "grammar":
        return <BookOpen className="h-4 w-4" />
      case "speaking":
        return <Mic className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || "Student"}!</h1>
        <p className="text-muted-foreground">Continue your language learning journey with personalized content.</p>
      </div>

      {/* Continue Learning Card */}
      <Card className="mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-suri-blue/20 to-suri-lavender/20 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Continue Learning</h2>
              <p className="text-muted-foreground mb-4">Pick up where you left off</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white/50">
                  Grammar
                </Badge>
                <Badge variant="outline" className="bg-white/50">
                  Intermediate
                </Badge>
                <Badge variant="outline" className="bg-white/50">
                  15 min
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <h3 className="font-medium">Past Tense Practice</h3>
              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <Button
                className="bg-suri-blue hover:bg-suri-blue/80 text-white"
                onClick={() => router.push("/lessons/grammar/past-tense")}
              >
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={() => router.push("/ai-chat")}
        >
          <MessageSquare className="h-6 w-6 text-suri-blue" />
          <span>Chat with AI</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={() => router.push("/lessons/video/conversation")}
        >
          <Video className="h-6 w-6 text-suri-teal" />
          <span>Practice Speaking</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={() => router.push("/schedule")}
        >
          <Calendar className="h-6 w-6 text-suri-lavender" />
          <span>Schedule Lesson</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          onClick={() => router.push("/resources")}
        >
          <BookOpen className="h-6 w-6 text-suri-rose" />
          <span>Resources</span>
        </Button>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <AdaptiveContentFlow />
            </div>
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-suri-blue" />
                    Upcoming Lessons
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                      onClick={() => router.push(`/lessons/${lesson.type}/${lesson.id}`)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                          {getLessonTypeIcon(lesson.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{lesson.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {lesson.date} • {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => router.push("/schedule")}>
                    View All Lessons
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-suri-lavender" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                    >
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      {activity.score && (
                        <Badge variant="outline" className="bg-suri-mint/10 text-green-700 border-suri-mint/30">
                          Score: {activity.score}%
                        </Badge>
                      )}
                      {activity.duration && (
                        <Badge variant="outline" className="bg-suri-blue/10 text-blue-700 border-suri-blue/30">
                          {activity.duration}
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => router.push("/progress")}>
                    View All Activities
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <EmotionalInsightTracker />
            </div>
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Schedule</CardTitle>
                  <CardDescription>Upcoming lessons and practice sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingLessons.map((lesson) => (
                      <div key={lesson.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{lesson.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>
                                {lesson.date} • {lesson.duration}
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-suri-blue/10 text-blue-700 border-suri-blue/30">
                            {lesson.type}
                          </Badge>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            className="bg-suri-blue hover:bg-suri-blue/80 text-white"
                            onClick={() => router.push(`/lessons/${lesson.type}/${lesson.id}`)}
                          >
                            Start Lesson
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => router.push("/schedule/new")}>
                    Schedule New Lesson
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-suri-blue" />
                    Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Connect your calendar to manage lessons</p>
                    <Button variant="outline" className="mb-2 w-full">
                      Connect Google Calendar
                    </Button>
                    <Button variant="outline" className="w-full">
                      Connect Apple Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Track your language learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Overall Progress</h4>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Grammar</h4>
                      <Progress value={80} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Advanced level</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Vocabulary</h4>
                      <Progress value={65} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Intermediate level</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Speaking</h4>
                      <Progress value={60} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Intermediate level</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Listening</h4>
                      <Progress value={70} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Upper intermediate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-medium">7-Day Streak</p>
                        <p className="text-xs text-muted-foreground">Practiced for 7 consecutive days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-suri-blue/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-suri-blue" />
                      </div>
                      <div>
                        <p className="font-medium">Grammar Master</p>
                        <p className="text-xs text-muted-foreground">Completed 10 grammar lessons</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-suri-mint/10 flex items-center justify-center">
                        <Mic className="h-5 w-5 text-suri-mint" />
                      </div>
                      <div>
                        <p className="font-medium">Conversation Starter</p>
                        <p className="text-xs text-muted-foreground">Completed 5 speaking sessions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tools Tab */}
        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AudioFeedbackHub />
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-suri-rose" />
                    Emotional Learning
                  </CardTitle>
                  <CardDescription>Track your emotional journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-2">Your Emotional Pattern</h4>
                      <p className="text-sm">
                        Your learning is most effective when you feel confident and relaxed. We've noticed you tend to
                        struggle more when feeling anxious about making mistakes.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-2">Personalized Tip</h4>
                      <p className="text-sm">
                        Try practicing in shorter, more frequent sessions when you're feeling most energetic. This has
                        shown to improve your retention by 30%.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => router.push("/journal")}>
                      Open Emotional Journal
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Headphones className="h-5 w-5 mr-2 text-suri-teal" />
                    AI Conversation Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">
                      Practice natural conversations with our AI language partner
                    </p>
                    <Button
                      className="bg-suri-teal hover:bg-suri-teal/80 text-white w-full"
                      onClick={() => router.push("/ai-chat")}
                    >
                      Start Conversation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StudentDashboard

