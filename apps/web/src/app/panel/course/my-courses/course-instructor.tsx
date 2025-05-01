import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { ICourse } from '@/modules/course'

interface Props {
  course: ICourse
  handleDeleteCourse: () => void
}

export function CourseInstructor({ course, handleDeleteCourse }: Props) {
  const { id, subtitle, title } = course

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="truncate text-lg">{title}</CardTitle>

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
      </CardHeader>
      <CardContent className="flex justify-between">
        <ScrollArea className="h-24">{subtitle}</ScrollArea>
      </CardContent>
    </Card>
  )
}
