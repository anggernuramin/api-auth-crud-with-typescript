import { Router } from 'express'
import { addTask, deleteTask, getTask, updateTask } from '../controllers/task.controller'
import { requireUser } from '../middlewares/auth.middleware'
// import { requireAdmin, requireUser } from '../middlewares/auth.middleware'

export const TaskRouter: Router = Router()

// Ini sama saja dengan https::/localhost:3000/task (Karena sudah didefinisikan di index.js pada folder router)
TaskRouter.get('/', getTask)
TaskRouter.get('/:id', getTask)
TaskRouter.post('/', requireUser, addTask) // menambahan middleware otorisasi dimana jika mengakses endpoint ini , user diharuskan login terlebih dahulu
// TaskRouter.post('/', requireAdmin, addTask) // menambahan middleware otorisasi dimana jika mengakses endpoint ini , user diharuskan login terlebih dahulu dan Rolw User adalah Admin
TaskRouter.put('/:id', requireUser, updateTask)
TaskRouter.delete('/:id', requireUser, deleteTask)
