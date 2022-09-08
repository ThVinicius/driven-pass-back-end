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

async function getByUserId(userId: number) {
  const credentials = await credentialsRepository.getByUserId(userId)

  return descriptAll(credentials)
}

function descriptAll(array: credentials[]) {
  return array.map(item => {
    item.password = cryptr.decrypt(item.password)
    return item
  })
}

function decryptPassword(password: string) {
  return cryptr.decrypt(password)
}

async function getById(id: number, userId: number) {
  const credencial = await validateCredentialGetById(id)

  const message = 'Você não tem permissão para acessar essa credencial'

  validateItsHis(credencial.userId, userId, message)

  credencial.password = decryptPassword(credencial.password)

  return credencial
}

function validateItsHis(dbUserId: number, userId: number, message: string) {
  if (dbUserId !== userId)
    throw {
      code: 'Unauthorized',
      message
    }
}

async function validateCredentialGetById(id: number) {
  const credential = await credentialsRepository.getById(id)

  if (credential === null)
    throw { code: 'Not Found', message: 'Essa credencial não existe' }

  return credential
}

async function hanleRemove(id: number, userId: number) {
  const credencial = await validateCredentialGetById(id)

  const message = 'Você não tem permissão para deletar essa credencial'

  validateItsHis(credencial.userId, userId, message)
}

async function removeCredential(id: number) {
  await credentialsRepository.remove(id)
}

export default { create, getByUserId, getById, hanleRemove, removeCredential }
