import { Book, Users } from 'lucide-react'

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Instructor() {
  return (
    <Card>
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
