import cardsRepository from '../repositories/cardsRepository'
import { ICards } from '../types/index'
import {
  encrypt,
  descriptAllPassword,
  decryptPassword,
  validateItsHis,
  validateGetById,
  descriptAllSecurityCode
} from '../../utils/serviceShared/index'
import { cards } from '@prisma/client'

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

  descriptAllSecurityCode(cards)

  return cards
}

async function getById(id: number, userId: number) {
  const promise = cardsRepository.getById(id)

  const messageError = 'Esse cartão não existe'

  const cards = <cards>(<unknown>await validateGetById(promise, messageError))

  const message = 'Você não tem permissão para acessar esse cartão'

  validateItsHis(cards.userId, userId, message)

  cards.password = decryptPassword(cards.password)

  cards.securityCode = decryptPassword(cards.securityCode)

  return cards
}

async function hanleRemove(id: number, userId: number) {
  const promise = cardsRepository.getById(id)

  const messageError = 'Esse cartão não existe'

  const cards = <cards>(<unknown>await validateGetById(promise, messageError))

  const message = 'Você não tem permissão para deletar esse cartão'

  validateItsHis(cards.userId, userId, message)
}

async function remove(id: number) {
  await cardsRepository.remove(id)
}

export default { create, getByUserId, getById, hanleRemove, remove }
