import { users, sessions, credentials } from '@prisma/client'

type IUsers = Omit<users, 'id'>

type ISessions = Omit<sessions, 'id'>

type ICredentials = Omit<credentials, 'id'>

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
    email: string
    password: string
  }
}

export { IUsers, ISessions, ICredentials }
