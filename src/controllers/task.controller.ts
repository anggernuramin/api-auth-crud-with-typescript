import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { taskUpdateValidation, taskValidation } from '../validations/task.validation'
import { logger } from '../utils/logger'
import {
  addTaskToDB,
  deleteTaskFromDB,
  getTaskFromDB,
  getTaskFromDBById,
  updateTaskFromDB
} from '../services/product.service'

export const addTask = async (req: Request, res: Response) => {
  // tambahkan task_id dahulu sebelum masuk validasi
  req.body.task_id = uuidv4()
  const { error, value } = taskValidation(req.body)
  if (error) {
    logger.info('Gagal Tambah Data')
    return res.status(422).send({ status: false, statusCode: 422, data: {}, message: error.details[0].message })
  }

  try {
    await addTaskToDB(value)
    return res.status(201).send({ status: true, statusCode: 201, message: 'Success' })
  } catch (error) {
    return res.status(422).send({ status: true, statusCode: 422, message: 'Gagal Tambah Data' })
  }
}

export const getTask = async (req: Request, res: Response) => {
  const task: any = await getTaskFromDB()
  const id = req.params.id
  if (id) {
    const getTaskById: any = await getTaskFromDBById(String(id))
    if (getTaskById === null) {
      return res.status(404).send({ status: true, statusCode: 404, data: {}, message: 'Data Not Found' })
    }
    return res.status(200).send({ status: true, statusCode: 200, data: getTaskById, message: 'Succes Get data by id' })
  }
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: task,
    message: 'Success'
  })
}

export const updateTask = async (req: Request, res: Response) => {
  const { error, value } = taskUpdateValidation(req.body)
  const id = req.params.id
  if (error) {
    return res.status(422).send({ status: false, statusCode: 422, data: {}, message: error.details[0].message })
  }

  try {
    const data = await updateTaskFromDB(String(id), value)
    if (data) {
      return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Update Task' })
    } else {
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data Not Found' })
    }
  } catch (error) {
    return res.status(422).send({ status: false, statusCode: 422, data: {}, message: error })
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const data = await deleteTaskFromDB(String(id))
    if (data) {
      return res.status(200).send({ status: true, statusCode: 200, message: 'Succes Delete' })
    } else {
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data Not Found' })
    }
  } catch (error) {
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
