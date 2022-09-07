import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import tokenSchema from '../schemas/tokenSchema'
import sessionsService from '../services/sessionsService'
import { Request, Response, NextFunction } from 'express'

dotenv.config()

export default async function tokenValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = tokenSchema.validate(req.headers)

  if (error) return res.sendStatus(400)

  const { authorization } = req.headers

  const token = authorization!.replace('Bearer ', '')

  const secretKey: string = process.env.JWT_SECRET!

  // try {
  const data = <jwt.UserIDJwtPayload>(<unknown>jwt.verify(
    token,
    secretKey,
    function (err) {
      if (err) {
        switch (err.name) {
          case 'JsonWebTokenError':
            return res.status(401).send('token inválido')

          case 'TokenExpiredError':
            return res.status(498).send('token expirado')

          default:
            console.log(error)
            return res.status(500).send(error)
        }
      }
    }
  ))

  await validateSession(token)

  res.locals.userId = data.id

  next()
  // } catch (error: any) {
  //   switch (error.name) {
  //     case 'JsonWebTokenError':
  //       return res.status(401).send('token inválido')

  //     case 'TokenExpiredError':
  //       return res.status(498).send('token expirado')

  //     default:
  //       console.log(error)
  //       return res.status(500).send(error)
  //   }
  // }
}

async function validateSession(token: string) {
  const session = await sessionsService.getSession(token)

  const message = `Esse token é antigo! 
  Gere um token novo e utilize-o para acessar essa rota.

  Porque desse erro? 
  A session foi planejada para armazenar o token mais recente, sempre que um login é efetuado é feito um upsert na tabela de sessions`

  if (session === null) throw { code: 'Upgrade Required', message }
}
