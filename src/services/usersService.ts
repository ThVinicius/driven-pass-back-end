import usersRepository from '../repositories/usersRepository'
import bcrypt from 'bcrypt'
import { IUsers } from '../types/index'

async function create(data: IUsers) {
  const password = cryptPassword(data.password)

  data.password = password

  await usersRepository.insert(data)
}

function cryptPassword(password: string) {
  const saltRounds: number = 10

  return bcrypt.hashSync(password, saltRounds)
}

export default { create }
