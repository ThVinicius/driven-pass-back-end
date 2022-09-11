import { Request, Response } from 'express'
import credentialsService from '../services/credentialsService'

async function create(req: Request, res: Response) {
  const session: { id: number } = res.locals.session

  const credential = await credentialsService.create(session.id, req.body)

  return res.status(201).send(credential)
}

async function getByUserId(_: Request, res: Response) {
  const session: { id: number } = res.locals.session

  const credentials = await credentialsService.getByUserId(session.id)

  return res.status(200).send(credentials)
}

async function getById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: { id: number } = res.locals.session

  const credencial = await credentialsService.getById(id, session.id)

  return res.status(200).send(credencial)
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: { id: number } = res.locals.session

  await credentialsService.hanleRemove(id, session.id)

  await credentialsService.removeCredential(id)

  return res.sendStatus(200)
}

export default { create, getByUserId, getById, remove }
