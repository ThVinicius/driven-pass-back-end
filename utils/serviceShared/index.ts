import Cryptr from 'cryptr'
import dotenv from 'dotenv'
import { credentials, cards } from '@prisma/client'
import { G } from '../../src/types/index'

dotenv.config()

const cryptr = cryptConfig()

function cryptConfig() {
  const secretKey: string = process.env.CRYPTR_SECRET!

  return new Cryptr(secretKey)
}

function encrypt(password: string) {
  return cryptr.encrypt(password)
}

function descriptAllPassword(array: credentials[] | cards[]) {
  return array.map(item => {
    item.password = cryptr.decrypt(item.password)
    return item
  })
}

function descriptAllSecurityCode(array: cards[]) {
  return array.map(item => {
    item.securityCode = cryptr.decrypt(item.securityCode)
    return item
  })
}

function decryptPassword(password: string) {
  return cryptr.decrypt(password)
}

function validateItsHis(dbUserId: number, userId: number, message: string) {
  if (dbUserId !== userId)
    throw {
      code: 'Unauthorized',
      message
    }
}

async function validateGetById(get: Promise<G>, message: string) {
  const item = await get

  if (item === null) throw { code: 'Not Found', message }

  // type Return = Exclude<G,null>

  type Return = typeof item

  return item as Return
}

export {
  encrypt,
  descriptAllPassword,
  decryptPassword,
  validateItsHis,
  validateGetById,
  descriptAllSecurityCode
}
