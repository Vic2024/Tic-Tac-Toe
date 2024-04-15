import HandleError from '../Middlewares/HandleError.js'
import HandleResponse from '../Middlewares/HandleResponse.js'
import { LoginModel } from '../Models/Login/Login.js'
import { validatePartialUser } from '../Validation/User.js'
import { isValidData } from './helper/isValidData.js'
export class LoginController {
  static async Login (req, res) {
    const result = validatePartialUser(req.body)
    if (result.success === false) {
      return HandleError(
        { name: 'InvalidData', message: isValidData(result.error.message) },
        req,
        res
      )
    } else {
      const isLoggin = await LoginModel.Login({ input: result.data })
      if (isLoggin.isSucces === false) {
        const { name, nameMessages } = isLoggin
        return HandleError({ name, nameMessages }, req, res)
      } else {
        return HandleResponse({ ...req, body: { ...isLoggin.result } }, res)
      }
    }
  }
}
