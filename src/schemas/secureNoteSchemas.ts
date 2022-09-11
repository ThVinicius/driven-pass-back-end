import joi from 'joi'

const create = joi.object({
  label: joi.string().trim().required(),
  title: joi.string().max(50).trim().required(),
  annotation: joi.string().max(1000).trim().required()
})

export default { create }
