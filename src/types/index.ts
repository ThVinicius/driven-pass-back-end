import { credentials, secureNotes, cards, wireless } from '@prisma/client'

export type G = secureNotes | credentials | cards | wireless | null

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
  }
}
