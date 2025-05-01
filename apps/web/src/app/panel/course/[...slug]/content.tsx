'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateCourse } from '@/modules/course'
import { formatYoutubeUrl } from '@/utils/format-youtube-url'

const lessonSchema = z.object({
  title: z.string().min(2, {
    message: 'Nome deve conter pelo menos 2 caracteres.',
  }),
  videoUrl: z.string().url({
    message: 'Insira um link válido para a aula.',
  }),
})

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Título do curso deve conter pelo menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'Descrição do curso deve conter pelo menos 2 caracteres.',
  }),
  subtitle: z.string().min(2, {
    message: 'Subtítulo do curso deve conter pelo menos 2 caracteres.',
  }),
  slug: z
    .string()
    .min(2, {
      message: 'Slug do curso deve conter pelo menos 2 caracteres.',
    })
    .refine((value) => value.trim().split(/\s+/).length === 1, {
      message: 'Tópico do curso deve ser apenas uma palavra.',
    }),
  lessons: z.array(lessonSchema),
})

type FormSchema = z.infer<typeof formSchema>

export function Content() {
  const router = useRouter()

  const { mutate: createCourse, isPending } = useCreateCourse()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      subtitle: '',
      slug: '',
      lessons: [{ title: '', videoUrl: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lessons',
  })

  const {
    formState: { isSubmitting },
    control,
  } = form

  function onSubmit(data: FormSchema) {
    const formData = {
      ...data,
      lessons: data.lessons.map((lesson) => ({
        title: lesson.title,
        videoUrl: formatYoutubeUrl(lesson.videoUrl),
      })),
    }

    createCourse(
      { course: formData },
      {
        onSuccess: () => {
          router.push('/panel')
        },
      },
    )
  }

  const isLoading = isPending || isSubmitting

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Curso</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para cadastrar um novo curso.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6"
          >
            <div className="col-span-1 space-y-6">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do curso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o TAG do curso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite um breve subtítulo para o curso"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite uma descrição detalhada do curso"
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1 flex flex-col gap-4">
              <div className="col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Aulas</h3>
                  <Button
                    type="button"
                    onClick={() => append({ title: '', videoUrl: '' })}
                    variant="secondary"
                  >
                    Adicionar Aula
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-4">
                    <FormField
                      control={control}
                      name={`lessons.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Nome da Aula</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o título desta aula"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`lessons.${index}.videoUrl`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Link da Aula</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o link do vídeo da aula"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Button
                  type="submit"
                  className="flex w-full gap-2"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Salvar
                  {isLoading && (
                    <LoaderCircle size={18} className="animate-spin" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
