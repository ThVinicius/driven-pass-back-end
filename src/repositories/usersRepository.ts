import prisma from '../database/db'
import { IUsers } from '../types/index'

async function insert(data: IUsers) {
  await prisma.users.create({ data })
}

export default { insert }
