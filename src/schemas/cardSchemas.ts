import joi from 'joi'
import { cardNumber, cardCVC, dateFormat, passwordFormat } from './regex'

const create = joi.object({
  label: joi.string().trim().required(),
  number: joi.string().length(19).pattern(cardNumber).required(),
  cardholderName: joi.string().trim().required(),
  securityCode: joi.string().length(3).pattern(cardCVC).required(),
  expirationDate: joi.string().length(5).pattern(dateFormat).required(),
  password: joi.string().min(4).max(6).pattern(passwordFormat).required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid('credit', 'debit', 'credit_and_debit').required()
})

export default { create }
