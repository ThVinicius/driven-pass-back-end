import { secureNotes } from '@prisma/client'

export type ISecureNotes = Omit<secureNotes, 'id' | 'createdAt'>
