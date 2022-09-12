import { cards } from '@prisma/client'

export type ICards = Omit<cards, 'id' | 'createdAt'>
