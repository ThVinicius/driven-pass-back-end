import { Request, Response } from 'express'
import credentialsService from '../services/credentialsService'
import { users } from '@prisma/client'

async function create(req: Request, res: Response) {
  const session: users = res.locals.session

  await credentialsService.create(session.id, req.body)

  return res.sendStatus(201)
}

export default { create }
