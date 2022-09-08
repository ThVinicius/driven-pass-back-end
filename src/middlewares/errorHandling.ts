import { ErrorRequestHandler } from 'express'
import errorMessage from '../../utils/errorMessage'

export const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  const message = 'Unique constraint failed on the fields:'

  const uniqueError = errorMessage(message, error.meta.target)

  switch (error.code) {
    case 'Bad request':
      return res.status(400).send(error.message)

    case 'Unauthorized':
      return res.status(401).send(error.message)

    case 'P2002':
      return res.status(409).send(uniqueError)

    default:
      console.log(error)
      return res.status(500).send(error)
  }
}
