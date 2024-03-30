import { Request, Response, NextFunction } from 'express'

// membatasi hak asses endpoint jika belum ada user
// Semua User
export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user // Mengambil user yang telah di set di file deserializeToken, dimana user ini diset setelah mberhasil dan mendapat token yang valid
  if (!user) {
    return res
      .status(403)
      .send({ status: false, statusCode: 403, message: 'For Bidden || Anda harus login terlebih dahulu' })
  }
  return next()
}

// User Admin
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  // cek apakah ada user dan role usernya admin
  if (!user || user._doc.role !== 'admin') {
    return res.status(403).send({
      status: false,
      statusCode: 403,
      message: 'For Bidden || Anda harus login terlebih dahulu || Role Anda Bukan Admin'
    })
  }

  return next()
}
