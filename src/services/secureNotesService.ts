import secureNotesRepository from '../repositories/secureNotesRepository'
import { ISegureNotes } from '../types/index'
import {
  validateItsHis,
  validateGetById
} from '../../utils/serviceShared/index'

async function create(sessionId: number, data: ISegureNotes) {
  data.userId = sessionId

  return await secureNotesRepository.insert(data)
}

async function getByUserId(userId: number) {
  const credentials = await secureNotesRepository.getByUserId(userId)

  return credentials
}

async function getById(id: number, userId: number) {
  const messageError = 'Essa nota segura não existe'

  const credencial = await validateGetById(
    secureNotesRepository.getById(id),
    messageError
  )

  const message = 'Você não tem permissão para acessar essa nota segura'

  validateItsHis(credencial.userId, userId, message)

  return credencial
}

async function hanleRemove(id: number, userId: number) {
  const messageError = 'Essa nota segura não existe'

  const credencial = await validateGetById(
    secureNotesRepository.getById(id),
    messageError
  )

  const message = 'Você não tem permissão para deletar essa nota segura'

  validateItsHis(credencial.userId, userId, message)
}

async function removeSecureNote(id: number) {
  await secureNotesRepository.remove(id)
}

export default { create, getByUserId, getById, hanleRemove, removeSecureNote }
