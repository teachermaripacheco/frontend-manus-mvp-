import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function VideoLessonLoading() {
  return (
    <div className="container py-8">
      <Card className="border-2 border-suri-blue/20">
        <CardHeader className="bg-gradient-to-r from-suri-blue/10 to-suri-teal/10 pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-video bg-gray-200 animate-pulse" />
          <div className="p-4">
            <Skeleton className="h-10 w-full mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

