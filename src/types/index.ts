import { users } from '@prisma/client'

type IUsers = Omit<users, 'id'>

export { IUsers }
