import prisma from '../database/db'
import { ISessions } from '../types/index'

async function upsert(data: ISessions) {
  const { token, userId } = data

  await prisma.sessions.upsert({
    where: { userId },
    update: { token },
    create: data
  })
}

async function getByToken(token: string) {
  return await prisma.sessions.findFirst({ where: { token } })
}

export default { upsert, getByToken }
