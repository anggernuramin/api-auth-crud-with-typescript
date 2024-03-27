import { Request, Response } from 'express'
import { taskValidation } from '../validations/task.validation'
import { logger } from '../utils/logger'

export const addTask = (req: Request, res: Response) => {
  const { error, value } = taskValidation(req.body)

  if (error) {
    logger.info('Gagal Tambah Data')

    res.status(422).send({ status: false, statusCode: 422, data: {}, message: error.details[0].message })
  }
  logger.info('Success Tambah Data')
  res.status(200).send({ status: true, statusCode: 200, data: value, message: 'Success' })
}

export const getProduct = (req: Request, res: Response) => {
  const title = req.params.name
  if (title) {
    res.status(200).send({ title })
  }
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: [
      {
        id: 1,
        title: 'Membuat Presentasi Proyek',
        description: 'Menyiapkan presentasi proyek untuk pertemuan dengan klien.',
        role: 'Project Manager',
        deadline: '2024-04-10',
        status: 'In Progress'
      },
      {
        id: 2,
        title: 'Optimasi Kode Backend',
        description: 'Mengoptimalkan performa dan keamanan kode backend aplikasi.',
        role: 'Backend Developer',
        deadline: '2024-04-15',
        status: 'Pending'
      },
      {
        id: 3,
        title: 'Desain Antarmuka Pengguna Baru',
        description: 'Merancang antarmuka pengguna yang responsif dan menarik untuk fitur baru.',
        role: 'UI/UX Designer',
        deadline: '2024-04-20',
        status: 'Pending'
      },
      {
        id: 4,
        title: 'Pemeliharaan Rutin Server',
        description: 'Melakukan pemeliharaan dan pemantauan rutin pada server aplikasi.',
        role: 'System Administrator',
        deadline: '2024-04-08',
        status: 'Completed'
      }
    ]
  })
}
