import { users, sessions } from '@prisma/client'

type IUsers = Omit<users, 'id'>

type ISessions = Omit<sessions, 'id'>

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
    email: string
    password: string
  }
}

export { IUsers, ISessions }
