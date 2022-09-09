import prisma from '../database/db'
import { ICredentials } from '../types/credentialsTypes'

async function insert(data: ICredentials) {
  return await prisma.credentials.create({ data })
}

async function getByUserId(userId: number) {
  return await prisma.credentials.findMany({ where: { userId } })
}

async function getById(id: number) {
  return await prisma.credentials.findFirst({ where: { id } })
}

async function remove(id: number) {
  return await prisma.credentials.delete({ where: { id } })
}

export default { insert, getByUserId, getById, remove }
