import cardsRepository from '../repositories/cardsRepository'
import { ICards } from '../types/index'
import {
  encrypt,
  descriptAllPassword,
  decryptPassword,
  validateItsHis,
  validateGetById
} from '../../utils/serviceShared/index'
import { credentials } from '@prisma/client'

async function create(sessionId: number, data: ICards) {
  data.securityCode = encrypt(data.securityCode)

  data.password = encrypt(data.password)

  data.userId = sessionId

  const credential = await cardsRepository.insert(data)

  const { id, userId, label, number, cardholderName, type } = credential

  return { id, userId, label, number, cardholderName, type }
}

async function getByUserId(userId: number) {
  const cards = await cardsRepository.getByUserId(userId)

  descriptAllPassword(cards)

  return cards
}

async function getById(id: number, userId: number) {
  const promise = cardsRepository.getById(id)

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
  const promise = cardsRepository.getById(id)

  const messageError = 'Essa credencial não existe'

  const credencial = <credentials>(
    (<unknown>await validateGetById(promise, messageError))
  )

  const message = 'Você não tem permissão para deletar essa credencial'

  validateItsHis(credencial.userId, userId, message)
}

async function removeCredential(id: number) {
  await cardsRepository.remove(id)
}

export default { create, getByUserId, getById, hanleRemove, removeCredential }
