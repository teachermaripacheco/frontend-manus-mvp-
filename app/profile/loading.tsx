import { Loader2 } from "lucide-react"

export default function ProfileLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    </div>
  )
}

