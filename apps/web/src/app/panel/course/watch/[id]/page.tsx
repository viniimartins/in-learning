import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
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

export default function CourseWatchPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>React Native</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-3 gap-8">
        <Card className="col-span-2 h-fit">
          <CardContent>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Course video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </CardContent>

          <Separator />

          <CardFooter>
            <span className="text-xl font-semibold leading-none">
              React Native
            </span>
          </CardFooter>
        </Card>

        <Card className="col-span-1 h-fit">
          <CardHeader>
            <Link href="/panel/course/details/1">
              <CardTitle className="text-xl">React Native</CardTitle>
            </Link>
          </CardHeader>

          <Separator />

          <CardContent className="pt-0">
            <Accordion type="single" collapsible defaultValue="module-1">
              <AccordionItem value="module-1">
                <AccordionTrigger className="flex items-center justify-between pt-0 hover:no-underline">
                  <div className="flex flex-1 items-center gap-2">
                    <span className="flex-1 text-lg font-semibold">
                      O que é React Native?
                    </span>
                  </div>

                  <span className="text-muted-foreground text-sm">3 aulas</span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, index) => {
                    const isLast = index === 2

                    return (
                      <div key={index}>
                        <div className="mb-3 flex items-center gap-2">
                          <Checkbox />

                          <span className="text-sm">Nome do cusro</span>
                        </div>

                        {!isLast && <Separator />}
                      </div>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>

          <Separator />

          <CardFooter className="flex flex-col items-start gap-1">
            <span className="text-base font-medium">Progresso</span>
            <Progress value={71} />

            <div className="ml-auto">
              <span className="text-muted-foreground text-sm font-medium">
                7% Completo
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
