import { Router } from 'express'
import usersRoute from './usersRoute'
import credentialsRoute from './credentialsRoute'
import secureNotesRoute from './secureNotesRoute'
import cardsRoute from './cardsRoute'
import wirelessRoute from './wirelessRoute'

const route = Router()

route.use(usersRoute)
route.use(credentialsRoute)
route.use(secureNotesRoute)
route.use(cardsRoute)
route.use(wirelessRoute)

export default route
