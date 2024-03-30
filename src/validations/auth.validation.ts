import Joi from 'joi'
import { UserInterface } from '../interfaces/user.interface'

export const authValidation = (payload: UserInterface) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}
export const createSessionValidation = (payload: UserInterface) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}

export const refreshSessionValidation = (payload: UserInterface) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })

  return schema.validate(payload)
}
