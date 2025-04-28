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
        title: 'Cadastrar',
        url: '/panel/course/register',
      },
      {
        title: 'Catálogo',
        url: '/panel/course/catalog',
      },
      {
        title: 'Desejos',
        url: '/panel/course/wishlist',
      },
      {
        title: 'Inscritos',
        url: '/panel/course/enrolled',
      },
      {
        title: 'Meus Cursos',
        url: '/panel/course/my-courses',
      },
    ],
  },
  {
    title: 'Instrutores',
    url: '/panel/instructors',
    icon: UserRound,
  },
]
