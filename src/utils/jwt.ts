import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/environments'

export const signJWT = (payload: Object, options?: jwt.SignOptions | undefined) => {
  // proses generate token , payload akan berisi data login setelah selesai mencoockkan by email dengan database
  //   jwt private untuk membuat token
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJWT = (token: string) => {
  try {
    // mencocokkan apakah token yang dikirim valid dan smaa dengan jwt public
    const decoded = jwt.verify(token, CONFIG.jwt_public)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt is expired or not eligable to use',
      // pesan jik a token sudah expired
      decoded: null
    }
  }
}
