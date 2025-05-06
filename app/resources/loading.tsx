import { Skeleton } from "@/components/ui/skeleton"

export default function ResourcesLoading() {
  return (
    <div className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-12 w-[300px] mb-4" />
        <Skeleton className="h-6 w-[500px]" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Skeleton className="h-10 w-full mb-8" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex justify-between mt-4 pt-4 border-t">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

