import { users, sessions, credentials, segureNotes } from '@prisma/client'

type IUsers = Omit<users, 'id'>

type ISessions = Omit<sessions, 'id'>

type ICredentials = Omit<credentials, 'id'>

type ISegureNotes = Omit<segureNotes, 'id'>

type G = segureNotes | credentials | null

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
    email: string
    password: string
  }
}

export { IUsers, ISessions, ICredentials, ISegureNotes, G }
