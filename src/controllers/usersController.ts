import { Request, Response } from 'express'
import usersService from '../services/usersService'

async function signUp(req: Request, res: Response) {
  await usersService.create(req.body)

  return res.sendStatus(201)
}

export default { signUp }
