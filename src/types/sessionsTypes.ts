import { sessions } from '@prisma/client'

export type ISessions = Omit<sessions, 'id'>
