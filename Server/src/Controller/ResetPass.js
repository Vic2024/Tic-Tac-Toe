import { validatePartialUser } from '../Validation/User.js'
import HandleError from '../Middlewares/HandleError.js'
import { isValidData } from './helper/isValidData.js'
import { ResetPassModel } from '../Models/ResetPassword/ResetPassword.js'
import HandleResponse from '../Middlewares/HandleResponse.js'
export class ResetPassController {
  static async ResetPass (req, res) {
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
      return HandleError({ name: 'InvalidData', nameMessages: 'InvalidPassword' }, req, res)
    }
    const result = validatePartialUser({ password: req.body.password })
    if (result.success === false) {
      return HandleError(
        { name: 'InvalidData', message: isValidData(result.error.message) },
        req,
        res
      )
    } else {
      const isReset = await ResetPassModel.ResetPass({ input: { id: req.params.id, ...result.data } })
      if (isReset.isSucces === false) {
        return HandleError({ name: isReset.name }, req, res)
      } else {
        return HandleResponse({ ...req, body: isReset.result }, res)
      }
    }
  }
}
