'use client'

import {
  BookCheck,
  BookOpen,
  Check,
  Play,
  PlusIcon,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
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

      {courses && courses?.data.length > 0 && (
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
      )}

      {courses?.data.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-10 text-center">
          <div className="flex flex-col items-center gap-2">
            <BookOpen className="text-muted-foreground size-16" />
            <h3 className="text-2xl font-medium">
              Sua jornada de aprendizado começa aqui
            </h3>
            <p className="text-muted-foreground max-w-md">
              Você ainda não se inscreveu em nenhum curso. Explore nosso
              catálogo e comece sua jornada de aprendizado hoje mesmo!
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link href="/panel/course/catalog">
              <Button className="gap-2">
                <PlusIcon className="size-4" />
                Explorar cursos disponíveis
              </Button>
            </Link>
            <p className="text-muted-foreground text-sm">
              Temos cursos para todos os níveis, do básico ao avançado.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
