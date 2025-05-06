import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Headphones, BookOpen, CheckSquare, ArrowLeft, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Resources | SURI AI",
  description: "Browse our curated collection of language learning resources",
}

export default function ResourcesPage() {
  // Podcast resources
  const podcasts = [
    {
      title: "Business English Mastery",
      description: "Learn essential business vocabulary and expressions for professional settings",
      duration: "45 min",
      level: "Intermediate",
      category: "Business",
    },
    {
      title: "Negotiation Skills",
      description: "Improve your negotiation tactics with practical English phrases",
      duration: "32 min",
      level: "Advanced",
      category: "Business",
    },
    {
      title: "Email Etiquette",
      description: "Perfect your professional email writing with these tips",
      duration: "28 min",
      level: "Beginner",
      category: "Business",
    },
    {
      title: "Presentation Techniques",
      description: "Master the art of presenting in English with confidence",
      duration: "38 min",
      level: "Intermediate",
      category: "Business",
    },
    {
      title: "Small Talk for Networking",
      description: "Learn how to engage in effective small talk at business events",
      duration: "25 min",
      level: "Beginner",
      category: "Business",
    },
    {
      title: "Advanced Business Vocabulary",
      description: "Expand your professional vocabulary with industry-specific terms",
      duration: "42 min",
      level: "Advanced",
      category: "Business",
    },
    {
      title: "English for Job Interviews",
      description: "Prepare for job interviews with common questions and effective responses",
      duration: "35 min",
      level: "Intermediate",
      category: "Career",
    },
    {
      title: "Everyday Conversations",
      description: "Practice casual English conversations for daily situations",
      duration: "30 min",
      level: "Beginner",
      category: "General",
    },
  ]

  // Article resources
  const articles = [
    {
      title: "Common English Idioms in Business",
      description: "Master these 20 idioms to sound more natural in meetings",
      readTime: "8 min",
      level: "Intermediate",
      category: "Business",
    },
    {
      title: "Grammar Essentials",
      description: "Review the most important grammar rules for clear communication",
      readTime: "12 min",
      level: "Beginner",
      category: "Grammar",
    },
    {
      title: "Cultural Differences in Business Communication",
      description: "Navigate international business conversations with confidence",
      readTime: "10 min",
      level: "Advanced",
      category: "Business",
    },
    {
      title: "Writing Effective Emails",
      description: "Learn the structure and language for professional email writing",
      readTime: "15 min",
      level: "Intermediate",
      category: "Business",
    },
    {
      title: "English Prepositions Mastery",
      description: "Understand when to use in, on, at, and other tricky prepositions",
      readTime: "9 min",
      level: "Beginner",
      category: "Grammar",
    },
    {
      title: "Phrasal Verbs in Professional Settings",
      description: "Learn common phrasal verbs used in workplace conversations",
      readTime: "11 min",
      level: "Intermediate",
      category: "Vocabulary",
    },
    {
      title: "Improving Your Accent",
      description: "Techniques for developing a clearer English pronunciation",
      readTime: "14 min",
      level: "All Levels",
      category: "Pronunciation",
    },
    {
      title: "English for International Meetings",
      description: "Key phrases and strategies for effective participation in global meetings",
      readTime: "13 min",
      level: "Advanced",
      category: "Business",
    },
  ]

  // Practice resources
  const practices = [
    {
      title: "Email Response Challenge",
      description: "Practice responding to different business scenarios",
      time: "15 min",
      level: "Intermediate",
      category: "Business",
    },
    {
      title: "Pronunciation Drills",
      description: "Quick exercises to improve your English pronunciation",
      time: "10 min",
      level: "Beginner",
      category: "Pronunciation",
    },
    {
      title: "Meeting Simulation",
      description: "Role-play different meeting scenarios to build confidence",
      time: "20 min",
      level: "Advanced",
      category: "Business",
    },
    {
      title: "Vocabulary Flashcards",
      description: "Test your knowledge of essential business vocabulary",
      time: "8 min",
      level: "All Levels",
      category: "Vocabulary",
    },
    {
      title: "Grammar Quiz",
      description: "Test your understanding of key grammar concepts",
      time: "12 min",
      level: "Intermediate",
      category: "Grammar",
    },
    {
      title: "Listening Comprehension",
      description: "Improve your ability to understand native English speakers",
      time: "18 min",
      level: "Intermediate",
      category: "Listening",
    },
    {
      title: "Phone Call Scenarios",
      description: "Practice handling different types of business calls",
      time: "15 min",
      level: "Intermediate",
      category: "Business",
    },
    {
      title: "Writing Practice: Business Reports",
      description: "Learn the structure and language for effective business reports",
      time: "25 min",
      level: "Advanced",
      category: "Writing",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "podcasts":
        return <Headphones className="h-5 w-5" />
      case "articles":
        return <BookOpen className="h-5 w-5" />
      case "practice":
        return <CheckSquare className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Learning Resources</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
          Enhance your language learning with our curated collection of resources
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input placeholder="Search resources..." className="w-full" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="grammar">Grammar</SelectItem>
              <SelectItem value="vocabulary">Vocabulary</SelectItem>
              <SelectItem value="pronunciation">Pronunciation</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="podcasts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="podcasts" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Podcasts
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="podcasts">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((podcast, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Podcast</span>
                    </div>
                    <Badge variant="outline">{podcast.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-1">{podcast.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{podcast.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between border-t pt-3">
                  <div className="text-sm text-gray-500">{podcast.duration}</div>
                  <div className="text-sm font-medium">{podcast.level}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Article</span>
                    </div>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-1">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between border-t pt-3">
                  <div className="text-sm text-gray-500">{article.readTime} read</div>
                  <div className="text-sm font-medium">{article.level}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((practice, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Practice</span>
                    </div>
                    <Badge variant="outline">{practice.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-1">{practice.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{practice.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between border-t pt-3">
                  <div className="text-sm text-gray-500">{practice.time}</div>
                  <div className="text-sm font-medium">{practice.level}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-500">Can't find what you're looking for?</p>
        <Button asChild>
          <Link href="/help">Need Something Specific?</Link>
        </Button>
      </div>
    </div>
  )
}

