import credentialsRepository from '../repositories/credentialsRepository'
import { ICredentials } from '../types/credentialsTypes'
import {
  encrypt,
  descriptAllPassword,
  decryptPassword,
  validateItsHis,
  validateGetById
} from '../../utils/serviceShared/index'
import { credentials } from '@prisma/client'

async function create(sessionId: number, data: ICredentials) {
  const { password } = data

  data.password = encrypt(data.password)

  data.userId = sessionId

  const credential = await credentialsRepository.insert(data)

  credential.password = password

  return credential
}

async function getByUserId(userId: number) {
  const credentials = await credentialsRepository.getByUserId(userId)

  return descriptAllPassword(credentials)
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
