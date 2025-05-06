"use client"

import { useState } from "react"
import { useUserData } from "@/contexts/user-data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { Loader2, User, BarChart, Brain, Heart, Clock, Award } from "lucide-react"

export default function ProfilePage() {
  const { userProfile, theTalkData, discProfile, learningStyle, viaData, progressHistory, weeklyInsights, isLoading } =
    useUserData()

  const [activeTab, setActiveTab] = useState("overview")

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  // Get latest progress for each skill area
  const getLatestProgress = (skillArea: string) => {
    const skillProgress = progressHistory
      .filter((entry) => entry.skillArea === skillArea)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return skillProgress.length > 0 ? skillProgress[0].score : 0
  }

  const skillAreas = ["speaking", "listening", "reading", "writing", "vocabulary", "grammar"]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Basic Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Name:</span> {userProfile?.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {userProfile?.email}
              </div>
              <div>
                <span className="font-medium">Level:</span> {userProfile?.level}
              </div>
              <div>
                <span className="font-medium">Joined:</span>{" "}
                {userProfile ? format(new Date(userProfile.joinedAt), "MMM d, yyyy") : ""}
              </div>
              <div>
                <span className="font-medium">Subscription:</span> {userProfile?.subscriptionTier}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Streak:</span> {userProfile?.streak} days
              </div>
              <div>
                <span className="font-medium">Lessons Completed:</span> {userProfile?.totalLessonsCompleted}
              </div>
              <div>
                <span className="font-medium">Practice Time:</span> {userProfile?.totalPracticeMinutes} minutes
              </div>
              <div>
                <span className="font-medium">Last Active:</span>{" "}
                {userProfile ? format(new Date(userProfile.lastActive), "MMM d, yyyy") : ""}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Skill Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skillAreas.map((skill) => (
                <div key={skill} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{skill}</span>
                    <span>{getLatestProgress(skill)}%</span>
                  </div>
                  <Progress value={getLatestProgress(skill)} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learning-profile">Learning Profile</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {theTalkData && (
              <Card>
                <CardHeader>
                  <CardTitle>The Talk Results</CardTitle>
                  <CardDescription>Your personalized learning preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">Communication Style:</h3>
                      <p>{theTalkData.communicationStyle}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Preferred Feedback Method:</h3>
                      <p>{theTalkData.preferredFeedbackMethod}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Motivation Factors:</h3>
                      <ul className="list-disc pl-5">
                        {theTalkData.motivationFactors.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Learning Challenges:</h3>
                      <ul className="list-disc pl-5">
                        {theTalkData.learningChallenges.map((challenge, index) => (
                          <li key={index}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {weeklyInsights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Latest Weekly Insight</CardTitle>
                  <CardDescription>
                    Week of {format(new Date(weeklyInsights[0].weekStarting), "MMM d")} -{" "}
                    {format(new Date(weeklyInsights[0].weekEnding), "MMM d")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">Practice Time:</h3>
                      <p>{weeklyInsights[0].practiceMinutes} minutes</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Lessons Completed:</h3>
                      <p>{weeklyInsights[0].lessonsCompleted}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Skill Improvements:</h3>
                      <ul className="list-disc pl-5">
                        {weeklyInsights[0].skillImprovements.map((improvement, index) => (
                          <li key={index}>
                            {improvement.skillArea}: +{improvement.improvement}%
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Focus Recommendation:</h3>
                      <p>{weeklyInsights[0].focusRecommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="learning-profile" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {discProfile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    DISC Profile
                  </CardTitle>
                  <CardDescription>Your communication and behavior style</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-1">Dominant</h3>
                        <Progress value={discProfile.dominant} className="h-2" />
                        <p className="text-sm text-right mt-1">{discProfile.dominant}%</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Influential</h3>
                        <Progress value={discProfile.influential} className="h-2" />
                        <p className="text-sm text-right mt-1">{discProfile.influential}%</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Steady</h3>
                        <Progress value={discProfile.steady} className="h-2" />
                        <p className="text-sm text-right mt-1">{discProfile.steady}%</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Compliant</h3>
                        <Progress value={discProfile.compliant} className="h-2" />
                        <p className="text-sm text-right mt-1">{discProfile.compliant}%</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium">Primary Type:</h3>
                      <p>{discProfile.primaryType}</p>
                    </div>

                    {discProfile.secondaryType && (
                      <div>
                        <h3 className="font-medium">Secondary Type:</h3>
                        <p>{discProfile.secondaryType}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {learningStyle && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Learning Style
                  </CardTitle>
                  <CardDescription>Your preferred ways of learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-1">Visual</h3>
                        <Progress value={learningStyle.visual} className="h-2" />
                        <p className="text-sm text-right mt-1">{learningStyle.visual}%</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Auditory</h3>
                        <Progress value={learningStyle.auditory} className="h-2" />
                        <p className="text-sm text-right mt-1">{learningStyle.auditory}%</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Kinesthetic</h3>
                        <Progress value={learningStyle.kinesthetic} className="h-2" />
                        <p className="text-sm text-right mt-1">{learningStyle.kinesthetic}%</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Reading/Writing</h3>
                        <Progress value={learningStyle.reading} className="h-2" />
                        <p className="text-sm text-right mt-1">{learningStyle.reading}%</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium">Primary Style:</h3>
                      <p className="capitalize">{learningStyle.primaryStyle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {viaData && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Character Strengths
                  </CardTitle>
                  <CardDescription>Your top VIA character strengths</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Top 5 Strengths</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {viaData.topStrengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">All Strengths</h3>
                      <div className="space-y-2">
                        {viaData.strengths.map((strength, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm">
                              <span>{strength.name}</span>
                              <span>{strength.score}%</span>
                            </div>
                            <Progress value={strength.score} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Skill Progress Over Time
                </CardTitle>
                <CardDescription>Your improvement in each language skill area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillAreas.map((skill) => {
                    const skillEntries = progressHistory
                      .filter((entry) => entry.skillArea === skill)
                      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                      .slice(-5) // Get last 5 entries

                    return (
                      <div key={skill} className="space-y-2">
                        <h3 className="font-medium capitalize">{skill}</h3>
                        <div className="h-[100px] bg-gray-50 rounded-md p-2">
                          {/* Simple chart visualization */}
                          <div className="flex h-full items-end space-x-2">
                            {skillEntries.map((entry, index) => (
                              <div key={index} className="flex-1 flex flex-col items-center">
                                <div
                                  className="bg-primary w-full rounded-t-sm"
                                  style={{ height: `${entry.score}%` }}
                                ></div>
                                <span className="text-xs mt-1">{format(new Date(entry.timestamp), "MMM d")}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            {weeklyInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Week of {format(new Date(insight.weekStarting), "MMM d")} -{" "}
                    {format(new Date(insight.weekEnding), "MMM d")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Activity</h3>
                      <ul className="space-y-1">
                        <li>
                          <span className="font-medium">Practice time:</span> {insight.practiceMinutes} minutes
                        </li>
                        <li>
                          <span className="font-medium">Lessons completed:</span> {insight.lessonsCompleted}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Improvements</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {insight.skillImprovements.map((improvement, i) => (
                          <li key={i}>
                            <span className="capitalize">{improvement.skillArea}:</span> +{improvement.improvement}%
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Analysis</h3>
                      <ul className="space-y-1">
                        <li>
                          <span className="font-medium">Mood trend:</span> {insight.moodTrend}
                        </li>
                        <li>
                          <span className="font-medium">Focus recommendation:</span> {insight.focusRecommendation}
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {weeklyInsights.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No weekly insights available yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

