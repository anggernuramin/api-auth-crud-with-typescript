/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from 'express'
import { addTask, getProduct } from '../controllers/task.controller'

export const TaskRouter: Router = Router()

// Ini sama saja dengan https::/localhost:3000/task (Karena sudah didefinisikan di index.js pada folder router)
TaskRouter.get('/', getProduct)
TaskRouter.get('/:name', getProduct)
TaskRouter.post('/', addTask)
