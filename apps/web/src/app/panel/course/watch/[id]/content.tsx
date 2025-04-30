'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useMarkCourseAsCompleted } from '@/modules/course/mutation/mark-course-as-completed'
import { useGetCourseById } from '@/modules/course/query/get-course-by-id'

export function Content() {
  const { id } = useParams<{ id: string }>()

  const [videoWatching, setVideoWatching] = useState({ url: '' })

  const { data: course, queryKey } = useGetCourseById({ course: { id } })

  const { mutate: markCourseAsCompleted } = useMarkCourseAsCompleted({
    queryKey,
  })

  const isCourseCompleted = course && course.progress[0].completed

  useEffect(() => {
    if (course && !videoWatching.url && course.lessons.length > 0) {
      setVideoWatching({ url: course.lessons[0].videoUrl })
    }
  }, [course, videoWatching.url])

  return (
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
          <Link href="/panel/course/details/1">
            <CardTitle className="text-xl">{course?.title}</CardTitle>
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
                    onClick={() => setVideoWatching({ url: lesson.videoUrl })}
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
              onClick={() => markCourseAsCompleted({ course: { id } })}
            >
              Marcar curso como assistido
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
  )
}
