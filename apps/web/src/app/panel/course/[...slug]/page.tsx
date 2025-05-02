import type { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { normalizeSlug } from '@/utils/normalized-slug'

import { Content } from './content'

interface Params {
  slug: string[]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params

  const { isEditing } = normalizeSlug(slug)

  return {
    title: isEditing ? 'Editar Curso' : 'Criar Curso',
  }
}

export default async function CourseCreateAndEditPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params

  const { isEditing, id } = normalizeSlug(slug)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEditing ? 'Editar Curso' : 'Criar Curso'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Content courseId={id} isEditing={isEditing} />
    </>
  )
}
