import prisma from '../database/db'
import { ICards } from '../types/index'

async function insert(data: ICards) {
  return await prisma.cards.create({ data })
}

async function getByUserId(userId: number) {
  return await prisma.cards.findMany({ where: { userId } })
}

async function getById(id: number) {
  return await prisma.cards.findFirst({ where: { id } })
}

async function remove(id: number) {
  return await prisma.cards.delete({ where: { id } })
}

export default { insert, getByUserId, getById, remove }
