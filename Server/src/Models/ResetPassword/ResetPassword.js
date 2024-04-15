import Process from './Process.js'
import { client } from '../../ConnectionDB.js'
import { encryptPassword } from '../../Controller/helper/User.js'
const { updatePassword } = Process()
export class ResetPassModel {
  static async ResetPass ({ input }) {
    const newPassword = await encryptPassword(10, input.password.toLowerCase())
    const result = await updatePassword({ client, input: { ...input, password: newPassword } })
    return result
  }
}
