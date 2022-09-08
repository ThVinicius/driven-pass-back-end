import prisma from '../database/db'
import { ICredentials } from '../types/index'

async function insert(data: ICredentials) {
  return await prisma.credentials.create({ data })
}

async function get(userId: number) {
  return await prisma.credentials.findMany({ where: { userId } })
}

export default { insert, get }
