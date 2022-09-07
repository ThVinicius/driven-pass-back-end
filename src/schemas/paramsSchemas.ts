import joi from 'joi'

const id = joi.object({
  id: joi.number().greater(0).required()
})

export default { id }
