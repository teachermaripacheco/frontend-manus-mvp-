import { Skeleton } from "@/components/ui/skeleton"

export default function ContactSalesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-suri-blue/5 dark:from-gray-950 dark:to-suri-blue/10">
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-24 mb-8" />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full mb-8" />

              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start">
                    <Skeleton className="h-9 w-9 rounded-full mr-4" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

