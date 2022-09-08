import { Request, Response } from 'express'
import secureNotesService from '../services/secureNotesService'
import { users } from '@prisma/client'

async function create(req: Request, res: Response) {
  const session: users = res.locals.session

  const secureNote = await secureNotesService.create(session.id, req.body)

  return res.status(201).send(secureNote)
}

async function getByUserId(_: Request, res: Response) {
  const session: users = res.locals.session

  const secureNotes = await secureNotesService.getByUserId(session.id)

  return res.status(200).send(secureNotes)
}

async function getById(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: users = res.locals.session

  const secureNote = await secureNotesService.getById(id, session.id)

  return res.status(200).send(secureNote)
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  const session: users = res.locals.session

  await secureNotesService.hanleRemove(id, session.id)

  await secureNotesService.removeSecureNote(id)

  return res.sendStatus(200)
}

export default { create, getByUserId, getById, remove }
