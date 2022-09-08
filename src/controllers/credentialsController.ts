import { Request, Response } from 'express'
import credentialsService from '../services/credentialsService'
import { users } from '@prisma/client'

async function create(req: Request, res: Response) {
  const session: users = res.locals.session

  const credential = await credentialsService.create(session.id, req.body)

  return res.status(201).send(credential)
}

async function get(_: Request, res: Response) {
  const session: users = res.locals.session

  const credentials = await credentialsService.get(session.id)

  return res.status(200).send(credentials)
}

export default { create, get }
