'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Trash, Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
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

const lessonSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome deve conter pelo menos 2 caracteres.',
  }),
  link: z.string().url({
    message: 'Insira um link válido para a aula.',
  }),
})

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome do curso deve conter pelo menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'Descrição do curso deve conter pelo menos 2 caracteres.',
  }),
  topic: z
    .string()
    .min(1, {
      message: 'Tópico do curso deve ser uma palavra.',
    })
    .refine((value) => value.trim().split(/\s+/).length === 1, {
      message: 'Tópico do curso deve ser apenas uma palavra.',
    }),
  image: z.array(z.instanceof(File)).min(1, 'Envie pelo menos uma imagem'),
  lessons: z.array(lessonSchema).optional(),
})

type FormSchema = z.infer<typeof formSchema>

export function Content() {
  const [image, setImage] = useState<File | null>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      topic: '',
      lessons: [{ link: '', name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lessons',
  })

  const {
    formState: { isSubmitting },
  } = form

  function onSubmit(data: FormSchema) {
    const formData = {
      ...data,
    }
    console.log(formData)
  }

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
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do curso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição do curso"
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tópico</FormLabel>
                    <FormControl>
                      <Input placeholder="Tópico do curso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Aulas</h3>
                  <Button
                    type="button"
                    onClick={() => append({ name: '', link: '' })}
                    variant="secondary"
                  >
                    Adicionar Aula
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-4">
                    <FormField
                      control={form.control}
                      name={`lessons.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Nome da Aula</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da aula" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`lessons.${index}.link`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Link da Aula</FormLabel>
                          <FormControl>
                            <Input placeholder="Link da aula" {...field} />
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
            </div>

            <div className="col-span-1 flex flex-col">
              <Card className="flex gap-2 rounded-none border-none p-0">
                <CardHeader className="p-0">
                  <CardTitle>Imagem do Curso</CardTitle>
                  <CardDescription className="hidden" />
                </CardHeader>
                <CardContent className="dark:bg-muted-foreground/10 relative flex h-[20rem] items-center justify-center border bg-neutral-100 p-0">
                  {image && (
                    <div className="relative h-full w-full">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={'Curso Image'}
                        fill
                        quality={100}
                        priority
                        className="p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      <div className="absolute right-5 top-5">
                        <Button
                          className="rounded-full"
                          size="icon"
                          onClick={() => setImage(null)}
                          type="button"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {!image && (
                    <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="text-muted-foreground size-6" />
                        <span className="text-muted-foreground text-sm">
                          Clique para selecionar a imagem do curso
                        </span>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0]
                          if (file) {
                            setImage(file)
                            form.setValue('image', [file], {
                              shouldValidate: true,
                            })
                          }
                        }}
                      />
                    </label>
                  )}

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input
                            type="hidden"
                            {...field}
                            value={field.value?.toString() || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="mt-auto">
                <Button
                  type="submit"
                  className="flex w-full gap-2"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Salvar
                  {isSubmitting && (
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
