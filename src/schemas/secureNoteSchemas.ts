import joi, { string } from 'joi'

const create = joi.object({
  title: joi.string().max(50).trim().required(),
  annotation: string().max(1000).trim().required()
})

export default { create }
