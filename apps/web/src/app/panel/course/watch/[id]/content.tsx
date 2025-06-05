'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Loading } from '@/components/loading'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCompletedCourse } from '@/modules/course'
import { useGetCourseById } from '@/modules/course/query/use-get-by-id'

export function Content() {
  const { id } = useParams<{ id: string }>()

  const [videoWatching, setVideoWatching] = useState({ url: '' })

  const {
    data: course,
    queryKey,
    isLoading: isCourseLoading,
  } = useGetCourseById({ course: { id } })

  const { mutate: completeCourse } = useCompletedCourse({
    queryKey,
  })

  const isCourseCompleted = course && course.progress[0].completed

  useEffect(() => {
    if (course && !videoWatching.url && course.lessons.length > 0) {
      setVideoWatching({ url: course.lessons[0].videoUrl })
    }
  }, [course, videoWatching.url])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{course?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {!isCourseLoading && (
        <div className="grid grid-cols-3 gap-8">
          <Card className="col-span-2 h-fit">
            <CardContent>
              {videoWatching.url && (
                <iframe
                  width="100%"
                  height="400"
                  src={videoWatching.url}
                  title="Course video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {!videoWatching.url && (
                <div className="h-100 bg-muted-foreground/10 flex items-center justify-center border" />
              )}
            </CardContent>

            <Separator />

            <CardFooter>
              <span className="text-xl font-semibold leading-none">
                {course?.title}
              </span>
            </CardFooter>
          </Card>

          <Card className="col-span-1 h-fit">
            <CardHeader className="flex items-center justify-between gap-2">
              <Link href="/panel/course/details/1" className="w-60 truncate">
                <CardTitle className="truncate text-xl">
                  {course?.title}
                </CardTitle>
              </Link>

              <span className="text-muted-foreground text-sm">
                {course?.lessons.length} aulas
              </span>
            </CardHeader>

            <Separator />

            <CardContent className="pt-0">
              {course?.lessons.map((lesson, index) => {
                const isLast = index === course.lessons.length - 1

                return (
                  <div key={index}>
                    <div className="mb-3 flex items-center gap-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0"
                        onClick={() =>
                          setVideoWatching({ url: lesson.videoUrl })
                        }
                      >
                        {lesson.title}
                      </Button>
                    </div>

                    {!isLast && <Separator />}
                  </div>
                )
              })}
            </CardContent>

            <Separator />

            <CardFooter>
              {!isCourseCompleted && (
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => completeCourse({ course: { id } })}
                >
                  Marcar curso como concluído
                </Button>
              )}

              {isCourseCompleted && (
                <Button variant="outline" size="sm" className="w-full" disabled>
                  <span className="text-muted-foreground text-sm">
                    Curso assistido
                  </span>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}

      {isCourseLoading && <Loading />}
    </>
  )
}
