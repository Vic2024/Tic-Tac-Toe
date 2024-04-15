import bcrypt from 'bcrypt'
export const encryptPassword = async (saltRound, password) => {
  return await bcrypt.hash(password, saltRound)
}
