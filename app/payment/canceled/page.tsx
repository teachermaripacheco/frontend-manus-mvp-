import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function PaymentCanceledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>

        <p className="text-muted-foreground mb-6">
          Your payment process was canceled. If you encountered any issues or have questions, please don't hesitate to
          contact our support team.
        </p>

        <div className="space-y-4">
          <Link href="/pricing">
            <Button className="w-full bg-suri-blue hover:bg-suri-blue/80 text-white">Return to Pricing</Button>
          </Link>

          <Link href="/contact">
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

