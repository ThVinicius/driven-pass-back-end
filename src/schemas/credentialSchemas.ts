import joi from 'joi'

const create = joi.object({
  label: joi.string().trim().required(),
  url: joi.string().uri().required(),
  username: joi.string().trim().required(),
  password: joi.string().required()
})

export default { create }
