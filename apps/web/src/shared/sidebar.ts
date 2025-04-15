import {
  Book,
  LayoutDashboardIcon,
  type LucideIcon,
  UserRound,
} from 'lucide-react'

interface SidebarItem {
  title: string
  url?: string
  icon: LucideIcon
  children?: {
    title: string
    url: string
  }[]
}

export const panel: SidebarItem[] = [
  {
    title: 'Painel',
    url: '/panel',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Cursos',
    icon: Book,
    children: [
      {
        title: 'Catálogo',
        url: '/panel/courses',
      },
      {
        title: 'Inscritos',
        url: '/panel/my-courses',
      },
      {
        title: 'Cadastrar',
        url: '/panel/register-course',
      },
      {
        title: 'Desejos',
        url: '/panel/wishlist',
      },
    ],
  },
  {
    title: 'Professores',
    url: '/panel/teachers',
    icon: UserRound,
  },
]
