import {
  users,
  sessions,
  credentials,
  segureNotes,
  cards
} from '@prisma/client'

type IUsers = Omit<users, 'id'>

type ISessions = Omit<sessions, 'id'>

type ICredentials = Omit<credentials, 'id'>

type ISegureNotes = Omit<segureNotes, 'id'>

type ICards = Omit<cards, 'id'>

type G = segureNotes | credentials | cards | null

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
    email: string
    password: string
  }
}

export { IUsers, ISessions, ICredentials, ISegureNotes, G, ICards }
