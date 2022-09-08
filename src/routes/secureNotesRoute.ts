import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import schemaValidator from '../middlewares/schemaValidator'
import secureNoteSchemas from '../schemas/secureNoteSchemas'
import paramsSchemas from '../schemas/paramsSchemas'
import secureNotesController from '../controllers/secureNotesController'

const route = Router()

route.post(
  '/secureNotes',
  tokenValidate,
  schemaValidator(secureNoteSchemas.create),
  secureNotesController.create
)

route.get('/secureNotes', tokenValidate, secureNotesController.getByUserId)

const isParams = true

route.get(
  '/secureNotes/:id',
  tokenValidate,
  schemaValidator(paramsSchemas.id, isParams),
  secureNotesController.getById
)

route.delete(
  '/secureNotes/:id',
  tokenValidate,
  schemaValidator(paramsSchemas.id, isParams),
  secureNotesController.remove
)

export default route
