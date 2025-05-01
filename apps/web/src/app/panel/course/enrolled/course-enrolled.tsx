import { Play, Trophy } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import type { ICourse } from '@/modules/course'

interface Props {
  course: ICourse
}

export default function CourseEnrolled({ course }: Props) {
  const { title, id, subtitle } = course

  const isCourseCompleted = course.progress[0].completed

  return (
    <Card>
      <CardContent className="flex justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>

        <Badge variant="outline">{subtitle}</Badge>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t">
        {!isCourseCompleted && (
          <Link href={`/panel/course/watch/${id}`} className="w-full">
            <Button variant="outline" className="w-full">
              <Play className="size-4" />
              Assistir
            </Button>
          </Link>
        )}
        {isCourseCompleted && (
          <Link href={`/panel/course/certificate/${id}`} className="w-full">
            <Button variant="outline" className="w-full">
              <Trophy className="size-4" />
              Visualizar Certificado
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
