import Joi from 'joi'
import { TaskInterface } from '../interfaces/task.interface'

export const taskValidation = (payload: TaskInterface) => {
  const schema = Joi.object({
    task_id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required()
  })

  //   payload data yang dikirim harus sesuai dengan skema yang telah dibuat dengan package Joi
  return schema.validate(payload)
}

export const taskUpdateValidation = (payload: TaskInterface) => {
  const schema = Joi.object({
    title: Joi.string().allow('', null), // dengan menambahkan allow null artinya title boleh kosong, karena title dan lain-alin tidak selelu doubah ketika melakukan update
    description: Joi.string().allow('', null),
    status: Joi.string().allow('', null)
  })

  //   payload data yang dikirim harus sesuai dengan skema yang telah dibuat dengan package Joi
  return schema.validate(payload)
}
