// Digunakan untuk menetukan otorisasi user
import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '../utils/jwt'

export const deserializeToken = async (req: Request, res: Response, next: NextFunction) => {
  // hapus kalimat Bearer pada req header, Authorization", `Bearer ${token}`, krena pada sebelumnya untuk suth nya menggunakan berare jadi secara default heaader akan ada Bearer kode_tokennya
  //   Karena value yang ingin dikirim adalah tokennya saja
  const accessToken = req.headers.authorization?.replace(/Bearer\s/, '')
  if (!accessToken) {
    return next()
  }

  //   Cocokkan hasil token apakah token hasil login valid/ sama dengan token yang di generat emenggunakan rsa generator jwt_public
  const token: any = verifyJWT(accessToken)
  if (token.decoded) {
    // mensetting user di server dengan hasil decoded
    res.locals.user = token.decoded
    return next()
  }

  if (token.expired) {
    next()
  }

  return next()
}
