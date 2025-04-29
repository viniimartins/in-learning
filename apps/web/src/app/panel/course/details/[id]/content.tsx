'use client'

import { Heart, Play, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getSession } from '@/auth/session-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetCourseById } from '@/modules/course/query/get-course-by-id'

export function Content() {
  const { id } = useParams<{ id: string }>()

  const session = getSession()

  const { data: course } = useGetCourseById({
    course: {
      id,
    },
  })

  const isInstructor = session?.sub === course?.instructor.id

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{course?.title}</h1>

          <p className="text-muted-foreground">{course?.description}</p>

          <div className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src={course?.instructor?.avatarUrl} />
              <AvatarFallback>
                {course?.instructor?.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-foreground text-sm">Criado por:</span>
              <span className="text-lg font-semibold">
                {course?.instructor?.name}
              </span>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="lessons">Aulas</TabsTrigger>
            </TabsList>
            <TabsContent value="description">{course?.description}</TabsContent>
            <TabsContent value="lessons">
              {course?.lessons.map((lesson, index) => {
                const isLast = index === course.lessons.length - 1

                return (
                  <div key={index}>
                    <div className="my-4 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                      >
                        <Play className="size-3 fill-current" />
                      </Button>

                      <span className="text-sm">{lesson.title}</span>
                    </div>

                    {!isLast && <Separator />}
                  </div>
                )
              })}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Card className="col-span-1 h-fit">
        <CardContent className="flex justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="size-4 fill-current" />
            <p className="text-sm">{course?.studentCount} Alunos</p>
          </div>

          <Badge className="h-8" variant="secondary">
            {course?.slug}
          </Badge>
        </CardContent>

        {!isInstructor && (
          <>
            <Separator />

            <CardFooter className="flex flex-col gap-2">
              <Link href="/panel/course/watch/1" className="w-full">
                <Button className="w-full">
                  <Play className="size-4 fill-current" />
                  Assistir
                </Button>
              </Link>

              <Button variant="outline" size="sm" className="w-full">
                <Heart className="size-4" />
                Adicionar ao favoritos
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
