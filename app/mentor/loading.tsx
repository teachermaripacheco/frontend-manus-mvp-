import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function MentorLoading() {
  return (
    <div className="container py-8">
      <Skeleton className="h-10 w-64 mx-auto mb-6" />
      <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-8" />

      <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-3" />
            <div>
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4 space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-12 w-1/2 ml-auto" />
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-12 w-3/5 ml-auto" />
        </CardContent>

        <div className="px-4 py-2">
          <div className="flex gap-2 mb-3">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        <CardFooter className="border-t p-3">
          <div className="flex w-full items-center space-x-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

