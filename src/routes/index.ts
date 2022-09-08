import { Router } from 'express'
import usersRoute from './usersRoute'
import credentialsRoute from './credentialsRoute'
import secureNotesRoute from './secureNotesRoute'
import cardsRoute from './cardsRoute'

const route = Router()

route.use(usersRoute)
route.use(credentialsRoute)
route.use(secureNotesRoute)
route.use(cardsRoute)

export default route
