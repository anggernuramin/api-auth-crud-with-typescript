import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { authValidation, createSessionValidation, refreshSessionValidation } from '../validations/auth.validation'
import { checkPassword, hashingPassword } from '../utils/hashingPassword'
import { addUser, findUserByEmail } from '../services/auth.service'
import { logger } from '../utils/logger'
import { signJWT, verifyJWT } from '../utils/jwt'
export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  const { error, value } = authValidation(req.body)
  if (error) {
    return res.status(422).send({ status: false, codeStatus: 422, data: null, message: error.details[0].message })
  }

  try {
    // Hashinng passsword sebelum disimpan kedalam database agar secure, dan simapn kedalam string
    value.password = `${hashingPassword(req.body.password)}` // agar menjadi string
    await addUser(value)

    return res.status(201).send({ status: true, statusCode: 201, data: value, message: 'Success Register User' })
  } catch (error) {
    logger.error('Failed register User')
    return res.status(422).send({ status: false, codeStatus: 422, data: null, message: error })
  }
}

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)
  if (error) {
    res.status(422).send({ status: false, codeStatus: 422, data: null, message: error.details[0].message })
  }

  try {
    const user: any = await findUserByEmail(value.email)
    // value.password = value yang dikirim oleh user melaui re.body
    // user.password = value yang diambil ari database
    const isValid = checkPassword(value.password, user.password)

    // jika email belum terdaftar
    if (!isValid) {
      return res
        .status(401)
        .send({ status: false, statusCode: 401, message: 'Invalid Login,check your password and email' })
    }
    // generate token jika berhasil login
    const accessToken = signJWT({ ...user }, { expiresIn: '5s' }) // token aktif hanya 1 day('1d)

    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' }) // refresh token lebih lama expired dari accessToken agar jika token expired user masih bisa masuk tanpa login menggunakan refresh token

    // Maka jika ingin login dengan auth/refresh/${refreshToken}
    return res
      .status(201)
      .send({ status: true, statusCode: 201, data: { accessToken, refreshToken }, message: 'Success Login User' })
  } catch (error: any) {
    return res.status(422).send({ status: false, codeStatus: 422, data: null, message: error.message })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body)
  if (error) {
    res.status(422).send({ status: false, codeStatus: 422, data: null, message: error.details[0].message })
  }

  try {
    // mengambil user dari  token
    const token: any = verifyJWT(value.refreshToken)

    const user = await findUserByEmail(token.decoded._doc.email)
    if (!user) return false
    // Maka hasil dari generate refresh token adalah expires dengan 1 hari, Tetapi refresh token expired d1 tahun Maka jika user login bisa menggunakan refresh token lagi, refresh token didapatkan ketika user pertama kali login
    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    return res
      .status(201)
      .send({ status: true, statusCode: 201, data: { accessToken }, message: 'Refresh Token Success' })
  } catch (error: any) {
    return res.status(422).send({ status: false, codeStatus: 422, data: null, message: error.message })
  }
}
