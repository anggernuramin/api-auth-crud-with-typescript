import bcrypt from 'bcrypt'

// encode password, mengubah password menjadi string acak yang tida bisa dibaca oleh manusia
export const hashingPassword = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

// decode password,mencocokkan password yang dikirim oleh user saat login dengan password yang disimpan di password
export const checkPassword = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword)
}
