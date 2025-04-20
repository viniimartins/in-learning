import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function CourseOverview() {
  return (
    <Card className="pt-0">
      <CardHeader className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={`https://picsum.photos/seed/1/300/200`}
          alt={`Curso ${1 + 1}`}
          priority
          quality={100}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <Badge variant="outline">Desenvolvimento</Badge>

        <CardTitle className="text-lg">Curso React Native</CardTitle>
      </CardContent>
      <CardFooter className="justify-between border-t">
        <div className="flex items-center gap-2">
          <Link href="/panel/course/details/1">
            <Button variant="link">Ver Detalhes</Button>
          </Link>
        </div>

        <Button variant="outline">
          <User className="size-4" />
          <span className="text-muted-foreground font-semibold">400</span>
          Alunos
        </Button>
      </CardFooter>
    </Card>
  )
}
