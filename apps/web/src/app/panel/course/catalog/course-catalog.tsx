import { User } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import type { ICourse } from '@/modules/course/model'

interface Props {
  course: ICourse
}

export default function CourseCatalog({ course }: Props) {
  const { id, title, studentCount, slug } = course

  return (
    <Card>
      <CardContent className="space-y-2">
        <Badge variant="outline">{slug}</Badge>

        <CardTitle className="text-lg">{title}</CardTitle>
      </CardContent>
      <CardFooter className="justify-between border-t">
        <div className="flex items-center gap-2">
          <Link href={`/panel/course/details/${id}`}>
            <Button variant="link">Ver Detalhes</Button>
          </Link>
        </div>

        <Button variant="outline">
          <User className="size-4" />
          <span className="text-muted-foreground font-semibold">
            {studentCount}
          </span>
          Alunos
        </Button>
      </CardFooter>
    </Card>
  )
}
