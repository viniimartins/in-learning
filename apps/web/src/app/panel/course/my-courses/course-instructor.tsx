import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ICourse } from '@/modules/course'

interface Props {
  course: ICourse
  handleDeleteCourse: () => void
}

export default function CourseInstructor({
  course,
  handleDeleteCourse,
}: Props) {
  const { id, subtitle, title } = course

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

        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="size-10 rounded-full"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/panel/course/details/${id}`} className="w-full">
                <DropdownMenuItem className="w-full">
                  <Eye className="mr-2 size-4" />
                  Ver detalhes
                </DropdownMenuItem>
              </Link>
              <Link href={`/panel/course/${id}/edit`} className="w-full">
                <DropdownMenuItem className="w-full">
                  <Pencil className="mr-2 size-4" />
                  Editar
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive w-full"
                onClick={handleDeleteCourse}
              >
                <Trash className="mr-2 size-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>

        <Badge variant="outline">{subtitle}</Badge>
      </CardContent>
    </Card>
  )
}
