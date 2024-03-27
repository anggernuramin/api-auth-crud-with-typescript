import mongoose from 'mongoose'
import { CONFIG } from '../config/environments'
import { logger } from './logger'

mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    logger.info('Connect DB Succes')
  })
  .catch((error) => {
    logger.error(`DB Connect Error: ${error}`)
    process.exit(1)
  })
