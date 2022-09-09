import prisma from '../database/db'
import { IWireless } from '../types/wirelessTypes'

async function insert(data: IWireless) {
  return await prisma.wireless.create({ data })
}

async function getByUserId(userId: number) {
  return await prisma.wireless.findMany({ where: { userId } })
}

async function getById(id: number) {
  return await prisma.wireless.findFirst({ where: { id } })
}

async function remove(id: number) {
  return await prisma.wireless.delete({ where: { id } })
}

export default { insert, getByUserId, getById, remove }
