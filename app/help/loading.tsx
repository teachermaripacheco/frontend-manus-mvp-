import { Skeleton } from "@/components/ui/skeleton"

export default function HelpLoading() {
  return (
    <div className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-12 w-[300px] mb-4" />
        <Skeleton className="h-6 w-[500px]" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1">
          <Skeleton className="h-10 w-full mb-8" />

          <Skeleton className="h-8 w-[200px] mb-4" />
          <div className="space-y-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="border rounded-lg p-6 mb-6">
            <Skeleton className="h-6 w-[200px] mb-2" />
            <Skeleton className="h-4 w-full mb-6" />

            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>

            <Skeleton className="h-10 w-full mt-6" />
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[200px] mb-1" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <div className="border rounded-lg p-4">
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[200px] mb-1" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

