import Cryptr from 'cryptr'
import dotenv from 'dotenv'
import credentialsRepository from '../repositories/credentialsRepository'
import { ICredentials } from '../types/index'
import { credentials } from '@prisma/client'

dotenv.config()

const cryptr = cryptConfig()

function cryptConfig() {
  const secretKey: string = process.env.CRYPTR_SECRET!

  return new Cryptr(secretKey)
}

function cryptrPassword(password: string) {
  return cryptr.encrypt(password)
}

async function create(sessionId: number, data: ICredentials) {
  data.password = cryptrPassword(data.password)

  data.userId = sessionId

  const credential = await credentialsRepository.insert(data)

  const { id, userId, label, url, username } = credential

  return { id, userId, label, url, username }
}

async function get(userId: number) {
  const credentials = await credentialsRepository.get(userId)

  return descriptAll(credentials)
}

function descriptAll(array: credentials[]) {
  return array.map(item => {
    item.password = cryptr.decrypt(item.password)
    return item
  })
}

export default { create, get }
