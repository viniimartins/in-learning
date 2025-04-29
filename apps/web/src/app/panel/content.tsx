'use client'

import { BookCheck, Check, Play, Trophy } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { ICourseWithStudentCourse } from '@/modules/course'
import { useGetCourses } from '@/modules/course/query/get-course'

import CourseEnrolled from './course/enrolled/course-enrolled'

export function Content() {
  const { data: courses } = useGetCourses<ICourseWithStudentCourse>({
    pageIndex: 1,
    perPage: 10,
    isEnrolled: true,
  })

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-1">
          <CardContent className="flex items-center">
            <div className="dark:bg-muted-foreground/10 relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full border bg-neutral-100">
              <Play className="size-5" />
            </div>
            <CardHeader className="flex-1">
              <CardTitle>Cursos Matriculados</CardTitle>
              <CardDescription className="text-2xl font-medium">
                10
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent className="flex items-center">
            <div className="dark:bg-muted-foreground/10 relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full border bg-neutral-100">
              <BookCheck className="size-5" />
            </div>
            <CardHeader className="flex-1">
              <CardTitle>Cursos ativos</CardTitle>
              <CardDescription className="text-2xl font-medium">
                49
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent className="flex items-center">
            <div className="dark:bg-muted-foreground/10 relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full border bg-neutral-100">
              <Check className="size-5" />
            </div>
            <CardHeader className="flex-1">
              <CardTitle>Aulas assistidas</CardTitle>
              <CardDescription className="text-2xl font-medium">
                49
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent className="flex items-center">
            <div className="dark:bg-muted-foreground/10 relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full border bg-neutral-100">
              <Trophy className="size-5" />
            </div>
            <CardHeader className="flex-1">
              <CardTitle>Cursos finalizados</CardTitle>
              <CardDescription className="text-2xl font-medium">
                49
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-8">
        <span className="text-2xl font-medium">
          Vamos começar a aprender, Vinicius
        </span>

        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-1/4">
              {courses?.data.map((course) => (
                <CourseEnrolled key={course.id} course={course} />
              ))}
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}
