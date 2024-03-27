import { TaskInterface } from '../interfaces/task.interface'
import { TaskModel } from '../models/task.model'
export const getTaskFromDB = async () => {
  const data = await TaskModel.find()
  return data
}

export const getTaskFromDBById = async (id: string) => {
  const data = await TaskModel.findOne({ task_id: id })
  return data
}

export const addTaskToDB = async (payload: TaskInterface) => {
  return await TaskModel.create(payload)
}

export const updateTaskFromDB = async (id: string, payload: TaskInterface) => {
  return await TaskModel.findOneAndUpdate(
    {
      task_id: id
    },
    {
      $set: payload
    }
  )
}

export const deleteTaskFromDB = async (id: string) => {
  return await TaskModel.findOneAndDelete({ task_id: id })
}
