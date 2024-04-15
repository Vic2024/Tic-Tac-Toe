import { client } from '../../ConnectionDB.js'
import ProcessSQL from './Process.js'
const { recoverPass } = ProcessSQL()
export class RecoverPasswordModel {
  static async RecoverPassword ({ input }) {
    const result = await recoverPass({
      client,
      input: {
        ...input,
        email: input.email.toLowerCase()
      }
    })
    return result
  }
}
