import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'admin'
    }
  },
  { timestamps: true }
)

export const UserModel = mongoose.model('user', UserSchema)
