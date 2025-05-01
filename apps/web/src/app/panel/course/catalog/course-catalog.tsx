import { User } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { ICourse } from '@/modules/course/model'

interface Props {
  course: ICourse
}

export default function CourseCatalog({ course }: Props) {
  const { id, title, studentCount, subtitle, slug } = course

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="truncate text-lg">{title}</CardTitle>

        <Badge variant="outline">{slug}</Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-20">
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/panel/course/details/${id}`}>
            <Button variant="link" className="p-0">
              Ver Detalhes
            </Button>
          </Link>
        </div>

        <Button variant="outline" size="sm">
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
