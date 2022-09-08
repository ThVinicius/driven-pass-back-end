import credentialsRepository from '../repositories/credentialsRepository'
import { ICredentials } from '../types/index'
import {
  cryptrPassword,
  descriptAll,
  decryptPassword,
  validateItsHis,
  validateGetById
} from '../../utils/serviceShared/index'
import { credentials } from '@prisma/client'

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

async function getById(id: number, userId: number) {
  const promise = credentialsRepository.getById(id)

  const messageError = 'Essa credencial não existe'

  const credencial = <credentials>(
    (<unknown>await validateGetById(promise, messageError))
  )

  const message = 'Você não tem permissão para acessar essa credencial'

  validateItsHis(credencial.userId, userId, message)

  credencial.password = decryptPassword(credencial.password)

  return credencial
}

async function hanleRemove(id: number, userId: number) {
  const promise = credentialsRepository.getById(id)

  const messageError = 'Essa credencial não existe'

  const credencial = <credentials>(
    (<unknown>await validateGetById(promise, messageError))
  )

  const message = 'Você não tem permissão para deletar essa credencial'

  validateItsHis(credencial.userId, userId, message)
}

async function removeCredential(id: number) {
  await credentialsRepository.remove(id)
}

export default { create, getByUserId, getById, hanleRemove, removeCredential }
