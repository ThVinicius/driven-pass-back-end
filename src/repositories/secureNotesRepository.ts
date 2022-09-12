import prisma from '../database/db'
import { ISecureNotes } from '../types/secureNotesTypes'

async function insert(data: ISecureNotes) {
  return await prisma.secureNotes.create({ data })
}

async function getByUserId(userId: number) {
  return await prisma.secureNotes.findMany({ where: { userId } })
}

async function getById(id: number) {
  return await prisma.secureNotes.findFirst({ where: { id } })
}

async function remove(id: number) {
  return await prisma.secureNotes.delete({ where: { id } })
}

export default { insert, getByUserId, getById, remove }
