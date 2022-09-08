import { ErrorRequestHandler } from 'express'
import errorMessage from '../../utils/errorMessage'

export const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  switch (error.code) {
    case 'Bad request':
      return res.status(400).send(error.message)

    case 'Unauthorized':
      return res.status(401).send(error.message)

    case 'Not Found':
      return res.status(404).send(error.message)

    case 'P2002':
      const message = 'Unique constraint failed on the fields:'

      return res.status(409).send(errorMessage(message, error.meta.target))

    default:
      console.log(error)
      return res.status(500).send(error)
  }
}
