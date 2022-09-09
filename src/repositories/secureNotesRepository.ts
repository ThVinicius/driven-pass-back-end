import prisma from '../database/db'
import { ISegureNotes } from '../types/secureNotesTypes'

async function insert(data: ISegureNotes) {
  return await prisma.segureNotes.create({ data })
}

async function getByUserId(userId: number) {
  return await prisma.segureNotes.findMany({ where: { userId } })
}

async function getById(id: number) {
  return await prisma.segureNotes.findFirst({ where: { id } })
}

async function remove(id: number) {
  return await prisma.segureNotes.delete({ where: { id } })
}

export default { insert, getByUserId, getById, remove }
