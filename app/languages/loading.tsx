import { Skeleton } from "@/components/ui/skeleton"

export default function LanguagesLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-6 w-24 mb-8" />
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-10 w-full max-w-md mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-md" />
            ))}
        </div>
      </div>
    </div>
  )
}

