import { Request, Response } from 'express'
import { TaskInterface } from '../interfaces/task.interface'

export const getDefaultData = (req: Request, res: Response) => {
  const data: TaskInterface[] = [
    {
      task_id: '12768tqte76',
      title: 'express',
      description: 'Belajar Express',
      status: 'resolve'
    },
    {
      task_id: '8723gqwkj32',
      title: 'typescript',
      description: 'Belajar TypeScript',
      status: 'pending'
    },
    {
      task_id: '9827ytrqwkj2',
      title: 'react',
      description: 'Belajar React',
      status: 'resolve'
    },
    {
      task_id: '8725plmzmx38',
      title: 'mongodb',
      description: 'Belajar MongoDB',
      status: 'pending'
    },
    {
      task_id: '5729hjkls23r',
      title: 'node.js',
      description: 'Belajar Node.js',
      status: 'resolve'
    },
    {
      task_id: '6238pqwmzkmv',
      title: 'vue.js',
      description: 'Belajar Vue.js',
      status: 'pending'
    },
    {
      task_id: '2457pqwmnmf2',
      title: 'angular',
      description: 'Belajar Angular',
      status: 'resolve'
    },
    {
      task_id: '1095opwwekz3',
      title: 'javascript',
      description: 'Belajar JavaScript',
      status: 'pending'
    },
    {
      task_id: '9834poklqwl3',
      title: 'html',
      description: 'Belajar HTML',
      status: 'resolve'
    },
    {
      task_id: '7326pokdwekm2',
      title: 'css',
      description: 'Belajar CSS',
      status: 'pending'
    }
  ]

  try {
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data,
      message: 'Success Get Data'
    })
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      statusCode: 500,
      data: null,
      message: 'Failed Get Data',
      error: error.message
    })
  }
}
