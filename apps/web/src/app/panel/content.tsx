'use client'

import { BookOpen, PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { getSession } from '@/auth/session-client'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourses } from '@/modules/course/query/get-course'

import CourseEnrolled from './course/enrolled/course-enrolled'

export function Content() {
  const session = getSession()

  const { data: courses, isLoading: isCoursesLoading } = useGetCourses({
    pageIndex: 1,
    perPage: 5,
    isEnrolled: true,
  })

  return (
    <>
      <div className="flex h-full flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-medium">
            Vamos começar a aprender,{' '}
            {!isCoursesLoading && (session?.name || session?.email)}
          </span>

          {isCoursesLoading && <Skeleton className="h-6 w-60" />}
        </div>

        <div className="flex h-full flex-col justify-between">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {courses?.data.map((course) => (
              <CourseEnrolled key={course.id} course={course} />
            ))}
          </div>

          <div className="flex justify-center">
            {courses && courses?.meta.total > 5 && (
              <Link href="/panel/course/catalog">
                <Button variant="outline">Ver todos</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {courses?.data.length === 0 && (
        <div className="dark:bg-muted-foreground/10 flex  flex-col items-center justify-center gap-6 rounded-lg border p-10 text-center">
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

      {isCoursesLoading && <Loading />}
    </>
  )
}
