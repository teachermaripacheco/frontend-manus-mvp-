import MentorMessages from "@/components/mentor-messages"

export const metadata = {
  title: "Mentor Messages | SURI AI",
  description: "Chat with your personalized language learning mentor",
}

export default function MentorPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Language Mentor</h1>
      <p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
        Your mentor adapts to your learning style and needs. Ask questions, seek guidance, or just practice your English
        in a supportive environment.
      </p>
      <MentorMessages />
    </div>
  )
}

