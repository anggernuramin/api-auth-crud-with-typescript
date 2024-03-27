import { Router } from 'express'
import { addTask, deleteTask, getTask, updateTask } from '../controllers/task.controller'

export const TaskRouter: Router = Router()

// Ini sama saja dengan https::/localhost:3000/task (Karena sudah didefinisikan di index.js pada folder router)
TaskRouter.get('/', getTask)
TaskRouter.get('/:id', getTask)
TaskRouter.post('/', addTask)
TaskRouter.put('/:id', updateTask)
TaskRouter.delete('/:id', deleteTask)
