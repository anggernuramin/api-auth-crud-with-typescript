import Joi from 'joi'
interface TaskInterface {
  title: string
  description: string
  status: string
  deadline: number
}

export const taskValidation = (payload: TaskInterface) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    deadline: Joi.number()
  })

  //   payload data yang dikirim harus sesuai dengan skema yang telah dibuat dengan package Joi
  return schema.validate(payload)
}
