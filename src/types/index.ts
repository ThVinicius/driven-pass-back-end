import { users, sessions } from '@prisma/client'

type IUsers = Omit<users, 'id'>

type ISessions = Omit<sessions, 'id'>

export { IUsers, ISessions }
