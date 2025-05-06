import { Skeleton } from "@/components/ui/skeleton"

export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>

        <div className="flex justify-center mb-8">
          <Skeleton className="h-10 w-64" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-[600px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

