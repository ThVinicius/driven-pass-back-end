import wirelessRepository from '../repositories/wirelessRepository'
import { IWireless } from '../types/wirelessTypes'
import {
  encrypt,
  descriptAllPassword,
  decryptPassword,
  validateItsHis,
  validateGetById
} from '../../utils/serviceShared/index'
import { wireless } from '@prisma/client'

async function create(sessionId: number, data: IWireless) {
  data.password = encrypt(data.password)

  data.userId = sessionId

  const wifi = await wirelessRepository.insert(data)

  const { id, userId, label, networkName } = wifi

  return { id, userId, label, networkName }
}

async function getByUserId(userId: number) {
  const wireless = await wirelessRepository.getByUserId(userId)

  return descriptAllPassword(wireless)
}

async function getById(id: number, userId: number) {
  const promise = wirelessRepository.getById(id)

  const messageError = 'Essa rede de WiFi não existe'

  const wifi = <wireless>(<unknown>await validateGetById(promise, messageError))

  const message = 'Você não tem permissão para acessar essa rede de WiFi'

  validateItsHis(wifi.userId, userId, message)

  wifi.password = decryptPassword(wifi.password)

  return wifi
}

async function hanleRemove(id: number, userId: number) {
  const promise = wirelessRepository.getById(id)

  const messageError = 'Essa rede de WiFi não existe'

  const wifi = <wireless>(<unknown>await validateGetById(promise, messageError))

  const message = 'Você não tem permissão para deletar essa rede de WiFi'

  validateItsHis(wifi.userId, userId, message)
}

async function remove(id: number) {
  await wirelessRepository.remove(id)
}

export default { create, getByUserId, getById, hanleRemove, remove }
