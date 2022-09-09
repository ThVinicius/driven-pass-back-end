import { credentials } from '@prisma/client'

export type ICredentials = Omit<credentials, 'id'>
