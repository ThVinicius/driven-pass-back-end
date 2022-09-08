import { Router } from 'express'
import usersRoute from './usersRoute'
import credentialsRoute from './credentialsRoute'
import secureNotesRoute from './secureNotesRoute'

const route = Router()

route.use(usersRoute)
route.use(credentialsRoute)
route.use(secureNotesRoute)

export default route
