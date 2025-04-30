import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import type { Paginated } from '@/helpers/paginated'

import { Button } from '../ui/button'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface PaginationProps {
  meta: Paginated.Meta
  onChangeParams: (params: Partial<Paginated.Params>) => void
}

export default function Pagination({ meta, onChangeParams }: PaginationProps) {
  return (
    <div className="mt-auto flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        Mostrando {meta.perPage * meta.pageIndex} de {meta.total} resultados
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Itens por página
          </Label>
          <Select
            value={`${meta.perPage}`}
            onValueChange={(value) =>
              onChangeParams({ perPage: Number(value) })
            }
          >
            <SelectTrigger className="w-20" id="rows-per-page">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Página {meta.pageIndex} de {meta.totalPages}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onChangeParams({ pageIndex: 1 })}
            disabled={meta.pageIndex === 1}
          >
            <span className="sr-only">Ir para primeira página</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            disabled={meta.pageIndex === 1}
            onClick={() => onChangeParams({ pageIndex: meta.pageIndex - 1 })}
          >
            <span className="sr-only">Ir para página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => onChangeParams({ pageIndex: meta.pageIndex + 1 })}
            disabled={meta.pageIndex === meta.totalPages}
          >
            <span className="sr-only">Ir para próxima página</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            disabled={meta.pageIndex === meta.totalPages}
            onClick={() => onChangeParams({ pageIndex: meta.totalPages })}
          >
            <span className="sr-only">Ir para última página</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
