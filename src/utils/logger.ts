import pino from 'pino'
import pretty from 'pino-pretty'

// Pino digunakan untuk logger/Menampilkan pesan di konsol dengan lebih Komunikatif
export const logger = pino(pretty())
