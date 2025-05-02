'use client'

import { Download, Printer } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useGetCourseById } from '@/modules/course/query/use-get-by-id'
import { formatDate } from '@/utils/formatDate'

export function Content() {
  const { id } = useParams<{ id: string }>()

  const { data: course } = useGetCourseById({
    course: {
      id,
    },
  })

  const isCourseCompleted = course?.progress[0].completed

  return (
    <>
      {isCourseCompleted && (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-background relative w-full max-w-4xl rounded-lg border-8 p-8 shadow-lg">
            <div className="relative z-10 flex flex-col items-center text-center ">
              <div className="mb-6">
                <h1 className="mb-1 text-3xl font-semibold">
                  Certificado de Conclusão
                </h1>
              </div>

              <p className="text-muted-foreground mb-8 text-lg">
                Este documento certifica que
              </p>

              <h2 className="mb-8 border-b-2 px-8 pb-2 text-2xl font-bold">
                {course?.instructor?.name || 'Aluno'}
              </h2>

              <p className="text-muted-foreground mb-8 max-w-2xl text-lg">
                concluiu com sucesso o curso{' '}
                <span className="text-primary font-semibold">
                  {course?.title}
                </span>
                , demonstrando dedicação e domínio completo do conteúdo
                apresentado.
              </p>

              <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-x-16">
                <div className="flex flex-col items-center">
                  <div className="bg-border h-px w-40"></div>
                  <p className="text-muted-foreground mt-2">
                    Instrutor do Curso
                  </p>
                  <p className="text-primary font-semibold">
                    {course?.instructor?.name || course?.instructor?.email}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-border h-px w-40"></div>
                  <p className="text-muted-foreground mt-2">
                    Data de Conclusão
                  </p>
                  <p className="text-primary font-semibold">
                    {formatDate(course?.progress[0].updatedAt ?? '')}
                  </p>
                </div>
              </div>

              <div className="mb-4 mt-12">
                <p className="text-muted-foreground text-sm">
                  Código de Verificação: {id.substring(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="size-4" />
              Imprimir Certificado
            </Button>

            <Button variant="outline" onClick={() => window.print()}>
              <Download className="size-4" />
              Baixar PDF
            </Button>
          </div>
        </div>
      )}

      {!isCourseCompleted && (
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">
            Ops! O curso ainda não foi concluído
          </h1>

          <p className="text-muted-foreground">
            Por favor, conclua o curso para poder gerar o certificado.
          </p>

          <Link href={`/panel/course/watch/${id}`} className="text-primary">
            <Button variant="outline">Voltar para o curso</Button>
          </Link>
        </div>
      )}
    </>
  )
}
