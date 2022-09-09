import sessionsRepository from '../repositories/sessionsRepository'
import jwt from 'jsonwebtoken'
import { ISessions } from '../types/sessionsTypes'
import { users } from '@prisma/client'

function createSession(user: users) {
  const secretKey: string = process.env.JWT_SECRET!

  const config = { expiresIn: 60 * 60 * 24 * 30 }

  const token = jwt.sign(user, secretKey, config)

  return { userId: user.id, token }
}

async function upsert(data: ISessions) {
  await sessionsRepository.upsert(data)
}

async function getSession(token: string) {
  return await sessionsRepository.getByToken(token)
}

export default { upsert, createSession, getSession }
