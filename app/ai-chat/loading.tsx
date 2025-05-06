import { Loader2 } from "lucide-react"

export default function AIChatLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">SURI AI Chat</h1>
      <div className="h-[700px] flex items-center justify-center border rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-suri-blue" />
          <h2 className="text-xl font-medium">Loading AI Chat Interface...</h2>
          <p className="text-muted-foreground">Connecting to OpenAI API</p>
        </div>
      </div>
    </div>
  )
}

