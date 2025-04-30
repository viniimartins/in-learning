import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date: string | Date) {
  if (!date) return ''

  return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
}
