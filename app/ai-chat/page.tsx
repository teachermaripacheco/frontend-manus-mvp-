import AIChatInterfaceWithOpenAI from "@/components/ai-chat-interface-with-openai"

export default function AIChatPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">SURI AI Chat</h1>
      <AIChatInterfaceWithOpenAI />
    </div>
  )
}

