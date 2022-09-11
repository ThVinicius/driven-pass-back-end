import { Request, Response } from 'express'
import cardsService from '../services/cardsService'

async function create(req: Request, res: Response) {
  const session: { id: number } = res.locals.session

  const cards = await cardsService.create(session.id, req.body)

  return res.status(201).send(cards)
}

async function getByUserId(_: Request, res: Response) {
  const session: { id: number } = res.locals.session

  const cards = await cardsService.getByUserId(session.id)

  return res.status(200).send(cards)
}

async function getById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: { id: number } = res.locals.session

  const cards = await cardsService.getById(id, session.id)

  return res.status(200).send(cards)
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: { id: number } = res.locals.session

  await cardsService.hanleRemove(id, session.id)

  await cardsService.remove(id)

  return res.sendStatus(200)
}

export default { create, getByUserId, getById, remove }
