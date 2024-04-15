import ProcessSQL from './Process.js'
import { client } from '../../ConnectionDB.js'
const { Login } = ProcessSQL()
export class LoginModel {
  static async Login ({ input }) {
    const { username, password } = input
    const result = await Login({ client, input: { password, username: username.toLowerCase() } })
    return result
  }
}
