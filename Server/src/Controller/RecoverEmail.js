import HandleError from '../Middlewares/HandleError.js'
import HandleResponse from '../Middlewares/HandleResponse.js'
import { RecoverPasswordModel } from '../Models/RecoverPassword/RecoverPassword.js'
import { validatePartialUser } from '../Validation/User.js'
import { isValidData } from './helper/isValidData.js'
export class RecoverEmailControler {
  static async recoverEmail (req, res) {
    const result = validatePartialUser(req.body)
    if (result.success === false) {
      return HandleError(
        { name: 'InvalidData', message: isValidData(result.error.message) },
        req,
        res
      )
    } else {
      const recoverPass = await RecoverPasswordModel.RecoverPassword({ input: result.data })
      if (recoverPass.isSucces === false) {
        const { name, nameMessages } = recoverPass
        return HandleError({ name, nameMessages }, req, res)
      } else {
        return HandleResponse({ ...req, body: { ...recoverPass.result } }, res)
      }
    }
  }
}
