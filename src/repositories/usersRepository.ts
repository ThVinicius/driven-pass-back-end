import prisma from '../database/db'
import { IUsers } from '../types/usersTypes'

async function insert(data: IUsers) {
  await prisma.users.create({ data })
}

async function getByEmail(email: string) {
  return await prisma.users.findUnique({ where: { email } })
}

export default { insert, getByEmail }
