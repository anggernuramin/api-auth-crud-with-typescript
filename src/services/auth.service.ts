import { UserModel } from '../models/auth.models'
import { UserInterface } from '../interfaces/user.interface'

export const addUser = async (payload: UserInterface) => {
  return await UserModel.create(payload)
}

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email })
}
