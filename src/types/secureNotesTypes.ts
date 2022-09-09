import { segureNotes } from '@prisma/client'

export type ISegureNotes = Omit<segureNotes, 'id'>
