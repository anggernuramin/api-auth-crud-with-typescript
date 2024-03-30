import { Router } from 'express'
import { getDefaultData } from '../controllers/home.controller'

export const HomeRouter: Router = Router()

// Ini sama saja dengan https::/localhost:3000/task (Karena sudah didefinisikan di index.js pada folder router)
HomeRouter.get('/', getDefaultData)
