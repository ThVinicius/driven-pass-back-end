import { ErrorRequestHandler } from 'express'
import errorMessage from '../../utils/errorMessage'

export const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  switch (error.code) {
    case 'P2002':
      const message = 'Unique constraint failed on the fields:'

      const toSend = errorMessage(message, error.meta.target)

      return res.status(409).send(toSend)

    default:
      console.log(error)
      return res.status(500).send(error)
  }
}
