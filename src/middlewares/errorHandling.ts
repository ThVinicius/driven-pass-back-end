import { ErrorRequestHandler } from 'express'
import errorMessage from '../../utils/errorMessage'

export const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  const message = 'Unique constraint failed on the fields:'

  const uniqueError = errorMessage(message, error.meta.target)

  console.log(error)

  if (error.name === 'JsonWebTokenError')
    return res.status(401).send('token inválido')

  if (error.name === 'TokenExpiredError')
    return res.status(498).send('token expirado')

  switch (error.code) {
    case 'P2002':
      return res.status(409).send(uniqueError)

    case 'Unauthorized':
      return res.status(401).send(error.message)

    case 'Upgrade Required':
      return res.status(426).send(error.message)

    case 'Token expired/invalid':
      return res.status(426).send(error.message)

    default:
      console.log(error)
      return res.status(500).send(error)
  }
}
