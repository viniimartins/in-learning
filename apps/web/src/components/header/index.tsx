'use client'

import { LogOut, MoonIcon, Sun, User2 } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { getSession } from '@/auth/session-client'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useSidebar } from '../ui/sidebar'

export function Header() {
  const { open } = useSidebar()

  const { setTheme, theme } = useTheme()

  const session = getSession()

  return (
    <header
      className={cn(
        'bg-background fixed z-50 flex h-20 w-full items-center border-b transition-[width,left] duration-300 ease-in-out',
        open
          ? 'left-[var(--sidebar-width)] w-[calc(100vw-var(--sidebar-width))]'
          : 'left-[var(--sidebar-width-icon)] w-[calc(100vw-var(--sidebar-width-icon))]',
      )}
    >
      <div className="flex w-full items-center justify-end px-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                <Avatar>
                  <AvatarImage src={session?.avatarUrl} />
                  <AvatarFallback>{session?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {session?.name || 'Usuário'}
                </span>
                <span className="text-muted-foreground text-xs">
                  {session?.email}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="flex w-72 flex-col gap-1 py-2"
          >
            <div className="flex flex-col items-center space-y-2 p-2">
              <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                <Avatar className="h-full w-full">
                  <AvatarImage src={session?.avatarUrl} />
                  <AvatarFallback>{session?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex w-full flex-col items-center gap-1 pb-2">
                <span className="text-base font-medium">
                  {session?.name || 'Usuário'}
                </span>
                <span className="text-muted-foreground text-sm">
                  {session?.email}
                </span>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile" className="px-0! py-0!">
                <Button
                  variant="ghost"
                  className="flex w-full justify-start gap-2"
                >
                  <User2 className="h-[1.2rem] w-[1.2rem]" />
                  Meu perfil
                </Button>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="flex w-full justify-start gap-2"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
                <Sun className="hidden h-[1.2rem] w-[1.2rem] transition-all dark:flex" />
                {theme === 'dark' ? 'Claro' : 'Escuro'}
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 font-normal"
              asChild
            >
              <a href="/api/auth/sign-out" className="px-0! py-0!">
                <Button
                  variant="ghost"
                  className="flex w-full justify-start gap-2"
                >
                  <LogOut size={20} />
                  Sair
                </Button>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
