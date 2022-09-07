import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'

const route = Router()

route.post('/credentials', tokenValidate)

export default route
