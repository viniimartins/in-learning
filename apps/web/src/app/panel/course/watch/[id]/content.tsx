'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useGetCourseById } from '@/modules/course/query/get-course-by-id'

export function Content() {
  const { id } = useParams<{ id: string }>()

  const { data: course } = useGetCourseById({
    course: {
      id,
    },
  })

  function getYoutubeEmbedUrl(url: string) {
    const videoId = new URLSearchParams(new URL(url).search).get('v')
    return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      <Card className="col-span-2 h-fit">
        <CardContent>
          <iframe
            width="100%"
            height="400"
            src={
              course?.lessons[0].videoUrl
                ? getYoutubeEmbedUrl(course.lessons[0].videoUrl)
                : ''
            }
            title="Course video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </CardContent>

        <Separator />

        <CardFooter>
          <span className="text-xl font-semibold leading-none">
            {course?.title}
          </span>
        </CardFooter>
      </Card>

      <Card className="col-span-1 h-fit">
        <CardHeader>
          <Link href="/panel/course/details/1">
            <CardTitle className="text-xl">{course?.title}</CardTitle>
          </Link>
        </CardHeader>

        <Separator />

        <CardContent className="pt-0">
          {course?.lessons.map((lesson, index) => {
            const { assisted, title } = lesson

            const isLast = index === course.lessons.length - 1

            return (
              <div key={index}>
                <div className="mb-3 flex items-center gap-2">
                  <Checkbox checked={assisted} />

                  <span className="text-sm">{title}</span>
                </div>

                {!isLast && <Separator />}
              </div>
            )
          })}
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col items-start gap-1">
          <span className="text-base font-medium">Progresso</span>
          <Progress value={course?.studentCourses[0].progress} />

          <div className="ml-auto">
            <span className="text-muted-foreground text-sm font-medium">
              {course?.studentCourses[0].progress}% Completo
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
