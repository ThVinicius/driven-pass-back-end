import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import schemaValidator from '../middlewares/schemaValidator'
import wirelessSchemas from '../schemas/wirelessSchemas'
import paramsSchemas from '../schemas/paramsSchemas'
import wirelessController from '../controllers/wirelessController'

const route = Router()

route.post(
  '/wireless',
  tokenValidate,
  schemaValidator(wirelessSchemas.create),
  wirelessController.create
)

route.get('/wireless', tokenValidate, wirelessController.getByUserId)

const isParams = true

route.get(
  '/wireless/:id',
  tokenValidate,
  schemaValidator(paramsSchemas.id, isParams),
  wirelessController.getById
)

route.delete(
  '/wireless/:id',
  tokenValidate,
  schemaValidator(paramsSchemas.id, isParams),
  wirelessController.remove
)

export default route
