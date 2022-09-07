import { Router } from 'express'
import schemaValidator from '../middlewares/schemaValidator'
import userSchemas from '../schemas/userSchemas'
import usersController from '../controllers/usersController'

const route = Router()

route.post('/signUp', schemaValidator(userSchemas.user), usersController.signUp)

export default route
