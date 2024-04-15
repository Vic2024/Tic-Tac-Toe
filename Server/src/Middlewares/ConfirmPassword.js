import { isValidData } from '../Controller/helper/isValidData.js'
import { UserModel } from '../Models/User/User.js'
import { validateConfirmPasswor } from '../Validation/User.js'
import HandleError from './HandleError.js'
export default async function (req, res, next) {
  const { id } = req.params
  const result = validateConfirmPasswor(req.body)
  if (result.success === false) {
    return HandleError(
      { name: 'InvalidData', message: isValidData(result.error.message) },
      req,
      res
    )
  } else {
    const isRealUser = await UserModel.isRealUser({ id, input: { ...result.data } })
    if (isRealUser.isSucces === false) {
      const { name, nameMessages } = isRealUser
      return HandleError({ name, nameMessages }, req, res)
    } else {
      next()
    }
  }
}
