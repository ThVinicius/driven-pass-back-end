import joi from 'joi'

const create = joi.object({
  label: joi.string().trim().required(),
  networkName: joi.string().trim().required(),
  password: joi.string().required()
})

export default { create }
