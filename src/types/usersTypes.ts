import { users } from '@prisma/client'

export type IUsers = Omit<users, 'id' | 'createdAt'>
