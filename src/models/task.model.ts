import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    task_id: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: String
    }
  },
  { timestamps: true }
)

export const TaskModel = mongoose.model('task', TaskSchema)
