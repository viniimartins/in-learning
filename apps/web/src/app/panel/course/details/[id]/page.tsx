import type { Metadata } from 'next'

import { Content } from './content'

export const metadata: Metadata = {
  title: 'Detalhes do Curso',
}

export default function CourseDetailsPage() {
  return <Content />
}
