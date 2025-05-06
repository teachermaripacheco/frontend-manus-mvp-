import { Loader2 } from "lucide-react"

export default function LoginLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-suri-blue" />
        <h2 className="text-xl font-medium">Loading...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your login form</p>
      </div>
    </div>
  )
}

