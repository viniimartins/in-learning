import {
  Book,
  BookPlus,
  Heart,
  LayoutDashboardIcon,
  Library,
  UserRound,
} from 'lucide-react'

export const panel = [
  {
    title: 'Painel',
    url: '/panel',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Cursos',
    url: '/panel/courses',
    icon: Book,
  },
  {
    title: 'Professores',
    url: '/panel/teachers',
    icon: UserRound,
  },
  {
    title: 'Lista de desejos',
    url: '/panel/wishlist',
    icon: Heart,
  },
  {
    title: 'Registrar um curso',
    url: '/panel/register-course',
    icon: BookPlus,
  },
  {
    title: 'Meus cursos',
    url: '/panel/my-courses',
    icon: Library,
  },
]
