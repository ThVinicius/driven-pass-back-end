import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import schemaValidator from '../middlewares/schemaValidator'
import credentialSchemas from '../schemas/credentialSchemas'
import credentialsController from '../controllers/credentialsController'

const route = Router()

route.post(
  '/credentials',
  tokenValidate,
  schemaValidator(credentialSchemas.create),
  credentialsController.create
)

route.get('/credentials', tokenValidate, credentialsController.get)

export default route
