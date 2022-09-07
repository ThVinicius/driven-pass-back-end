import { Router } from 'express'
import usersRoute from './usersRoute'
import credentialsRoute from './credentialsRoute'

const route = Router()

route.use(usersRoute)
route.use(credentialsRoute)

export default route
