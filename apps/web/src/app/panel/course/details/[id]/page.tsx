import { Heart, Play, Users } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CourseDetailsPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel/course/catalog">
              Catálogo
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>React Native</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">React Native</h1>

            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos.
            </p>

            <div className="flex items-center gap-2">
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-foreground text-sm">Criado por:</span>
                <span className="text-lg font-semibold">
                  Vinicius Martins Ribeiro
                </span>
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="lessons">Aulas</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                It gives you a huge self-satisfaction when you look at your work
                and say, "I made this!". I love that feeling after I'm done
                working on something. When I lean back in my chair, look at the
                final result with a smile, and have this little "spark joy"
                moment. It's especially satisfying when I know I just made
                $5,000. I do! And that's why I got into this field. Not for the
                love of Web Design, which I do now. But for the LIFESTYLE! There
                are many ways one can achieve this lifestyle. This is my way.
                This is how I achieved a lifestyle I've been fantasizing about
                for five years. And I'm going to teach you the same. Often
                people think Web Design is complicated. That it needs some
                creative talent or knack for computers. Sure, a lot of people
                make it very complicated. People make the simplest things
                complicated. Like most subjects taught in the universities. But
                I don't like complicated. I like easy. I like life hacks. I like
                to take the shortest and simplest route to my destination. I
                haven't gone to an art school or have a computer science degree.
                I'm an outsider to this field who hacked himself into it,
                somehow ending up being a sought-after professional. That's how
                I'm going to teach you Web Design. So you're not demotivated on
                your way with needless complexity. So you enjoy the process
                because it's simple and fun. So you can become a Freelance Web
                Designer in no time. For example, this is a Design course but I
                don't teach you Photoshop. Because Photoshop is needlessly
                complicated for Web Design. But people still teach it to web
                designers. I don't. I teach Figma – a simple tool that is taking
                over the design world. You will be designing a complete website
                within a week while others are still learning how to create
                basic layouts in Photoshop. Second, this is a Development
                course. But I don't teach you how to code. Because for Web
                Design coding is needlessly complicated and takes too long to
                learn. Instead, I teach Webflow – a tool that is taking over the
                web design world. You will be building complex websites within
                two weeks while others are still learning the basics of HTML &
                CSS. Third, this is a Freelancing course. But I don't just teach
                you how to write great proposals. I give you a winning proposal
                template. When you're done with the course, you will have a
                stunning portfolio website with portfolio pieces already in it.
                Buy this course now and take it whenever the time is right for
                you.
              </TabsContent>
              <TabsContent value="lessons">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="flex items-center justify-between hover:no-underline">
                      <div className="flex flex-1 items-center gap-2">
                        <span className="flex-1 text-lg font-semibold">
                          O que é React Native?
                        </span>
                      </div>

                      <span className="text-muted-foreground text-sm">
                        3 aulas
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      {Array.from({ length: 10 }).map((_, index) => {
                        const isLast = index === 9

                        return (
                          <div key={index}>
                            <div className="mb-3 flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 rounded-full"
                              >
                                <Play className="size-3 fill-current" />
                              </Button>

                              <span className="text-sm">Nome do cusro</span>
                            </div>

                            {!isLast && <Separator />}
                          </div>
                        )
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Card className="col-span-1 h-fit">
          <CardContent className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              <p className="text-muted-foreground">10 Alunos</p>
            </div>

            <Badge className="h-8" variant="outline">
              Desenvolvimento
            </Badge>
          </CardContent>

          <Separator />

          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">
              <Play className="size-4 fill-current" />
              Assistir
            </Button>

            <Button variant="outline" size="sm" className="w-full">
              <Heart className="size-4" />
              Adicionar ao favoritos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
