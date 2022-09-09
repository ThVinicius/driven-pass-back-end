import { Request, Response } from 'express'
import wirelessService from '../services/wirelessService'
import { users } from '@prisma/client'

async function create(req: Request, res: Response) {
  const session: users = res.locals.session

  const wifi = await wirelessService.create(session.id, req.body)

  return res.status(201).send(wifi)
}

async function getByUserId(_: Request, res: Response) {
  const session: users = res.locals.session

  const wireless = await wirelessService.getByUserId(session.id)

  return res.status(200).send(wireless)
}

async function getById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: users = res.locals.session

  const wifi = await wirelessService.getById(id, session.id)

  return res.status(200).send(wifi)
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: users = res.locals.session

  await wirelessService.hanleRemove(id, session.id)

  await wirelessService.remove(id)

  return res.sendStatus(200)
}

export default { create, getByUserId, getById, remove }
