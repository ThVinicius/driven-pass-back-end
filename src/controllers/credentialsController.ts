import { Request, Response } from 'express'
import credentialsService from '../services/credentialsService'
import { users } from '@prisma/client'

async function create(req: Request, res: Response) {
  const session: users = res.locals.session

  const credential = await credentialsService.create(session.id, req.body)

  return res.status(201).send(credential)
}

async function getByUserId(_: Request, res: Response) {
  const session: users = res.locals.session

  const credentials = await credentialsService.getByUserId(session.id)

  return res.status(200).send(credentials)
}

async function getById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: users = res.locals.session

  const credencial = await credentialsService.getById(id, session.id)

  return res.status(200).send(credencial)
}

export default { create, getByUserId, getById }
