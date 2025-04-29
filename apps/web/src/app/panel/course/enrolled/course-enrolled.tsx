import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ICourse } from '@/modules/course'

interface Props {
  course: ICourse
}

export default function CourseEnrolled({ course }: Props) {
  const { title, id } = course

  return (
    <Card className="pt-0">
      <CardHeader className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={`https://picsum.photos/seed/1/300/200`}
          alt={`Curso ${1 + 1}`}
          priority
          quality={100}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t">
        <Link href={`/panel/course/watch/${id}`} className="w-1/2">
          <Button variant="outline" className="w-full">
            <Play className="size-4" />
            Assistir
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
