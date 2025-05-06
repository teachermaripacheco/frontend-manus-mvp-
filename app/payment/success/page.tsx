import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>

        <p className="text-muted-foreground mb-6">
          Thank you for subscribing to SURI AI. Your payment has been processed successfully, and you now have access to
          your chosen plan.
        </p>

        <div className="space-y-4">
          <Link href="/dashboard">
            <Button className="w-full bg-suri-blue hover:bg-suri-blue/80 text-white">Go to Dashboard</Button>
          </Link>

          <Link href="/ai-chat">
            <Button variant="outline" className="w-full">
              Start Learning Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

