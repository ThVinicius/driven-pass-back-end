import Cryptr from 'cryptr'
import dotenv from 'dotenv'
import credentialsRepository from '../repositories/credentialsRepository'
import { ICredentials } from '../types/index'

dotenv.config()

const cryptr = cryptConfig()

function cryptConfig() {
  const secretKey: string = process.env.CRYPTR_SECRET!

  return new Cryptr(secretKey)
}

function cryptrPassword(password: string) {
  return cryptr.encrypt(password)
}

async function create(userId: number, data: ICredentials) {
  data.password = cryptrPassword(data.password)

  data.userId = userId

  await credentialsRepository.insert(data)
}

export default { create }
