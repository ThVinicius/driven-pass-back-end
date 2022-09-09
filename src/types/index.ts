import { credentials, segureNotes, cards, wireless } from '@prisma/client'

export type G = segureNotes | credentials | cards | wireless | null

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
    email: string
    password: string
  }
}
