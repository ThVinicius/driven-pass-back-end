import joi, { string } from 'joi'

const create = joi.object({
  label: joi.string().trim().required(),
  url: joi.string().uri().required(),
  username: string().trim().required(),
  password: string().required()
})

export default { create }
