import { BookCheck, Check, Play, Trophy } from 'lucide-react'
import type { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
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

import CourseEnrolled from './course-enrolled'

export const metadata: Metadata = {
  title: 'Painel',
}

export default function PanelPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Painel</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
              <CourseEnrolled />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <CourseEnrolled />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <CourseEnrolled />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <CourseEnrolled />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <CourseEnrolled />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}
