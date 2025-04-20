import { Book, Users } from 'lucide-react'
import Image from 'next/image'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Instructor() {
  return (
    <Card className="pt-0">
      <CardHeader className="relative aspect-square overflow-hidden rounded-t-lg">
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
      <CardContent>
        <CardTitle className="text-center text-lg">
          Vinicius Martins Ribeiro
        </CardTitle>
      </CardContent>

      <Separator />
      <CardFooter className="flex justify-between gap-2">
        <span className="flex items-center gap-2 text-center text-sm font-medium">
          <Book className="size-4" />
          10 Cursos
        </span>

        <Separator orientation="vertical" />

        <span className="flex items-center gap-2 text-center text-sm font-medium">
          <Users className="size-4 fill-current" />
          10 Estudantes
        </span>
      </CardFooter>
    </Card>
  )
}
