import prisma from '../database/db'
import { ICredentials } from '../types/index'

async function insert(data: ICredentials) {
  await prisma.credentials.create({ data })
}

export default { insert }
