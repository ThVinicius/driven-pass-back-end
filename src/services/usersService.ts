import usersRepository from '../repositories/usersRepository'
import bcrypt from 'bcrypt'
import { IUsers } from '../types/index'

async function create(data: IUsers) {
  const password = bcryptPassword(data.password)

  data.password = password

  await usersRepository.insert(data)
}

function bcryptPassword(password: string) {
  const saltRounds: number = 10

  return bcrypt.hashSync(password, saltRounds)
}

async function hanleSignIn(user: IUsers) {
  const dbUser = await usersRepository.getByEmail(user.email)

  if (dbUser === null)
    throw { code: 'Unauthorized', message: 'Email ou password incorreto' }

  validatePassword(user.password, dbUser.password)

  return dbUser
}

function validatePassword(password: string, dbPassword: string) {
  const compare = bcrypt.compareSync(password, dbPassword)

  if (!compare)
    throw { code: 'Unauthorized', message: 'Email ou password incorreto' }
}

export default { create, hanleSignIn }
