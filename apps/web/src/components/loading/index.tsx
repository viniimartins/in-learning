import { Loader2 } from 'lucide-react'

export function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="size-10 animate-spin" />
    </div>
  )
}
