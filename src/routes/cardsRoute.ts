import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import schemaValidator from '../middlewares/schemaValidator'
import cardSchemas from '../schemas/cardSchemas'
import paramsSchemas from '../schemas/paramsSchemas'
import cardsController from '../controllers/cardsController'

const route = Router()

route.post(
  '/cards',
  tokenValidate,
  schemaValidator(cardSchemas.create),
  cardsController.create
)

route.get('/cards', tokenValidate, cardsController.getByUserId)

const isParams = true

route.get(
  '/cards/:id',
  tokenValidate,
  schemaValidator(paramsSchemas.id, isParams),
  cardsController.getById
)

route.delete(
  '/cards/:id',
  tokenValidate,
  schemaValidator(paramsSchemas.id, isParams),
  cardsController.remove
)

export default route
