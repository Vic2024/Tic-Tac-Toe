/* eslint-disable prefer-const */
import HandleError from '../Middlewares/HandleError.js'
import HandleResponse from '../Middlewares/HandleResponse.js'
import { UserModel } from '../Models/User/User.js'
import { validatePartialUser, validateUser } from '../Validation/User.js'
import { isValidData } from './helper/isValidData.js'
export class UserController {
  static async getAll (req, res) {
    let result
    result = validatePartialUser(req.query)
    if (req.query && result.success === false) {
      return HandleError(
        { name: 'InvalidData', message: isValidData(result.error.message) },
        req,
        res
      )
    }
    const users = await UserModel.getAll({ input: { ...result.data, params: req.headers.username } })
    if (users.isSucces === false) HandleError({ name: users.result.name }, req, res)
    else HandleResponse({ ...req, body: users.result }, res)
  }

  static async getById (req, res) {
    const { id } = req.params
    const user = await UserModel.getById({ id })
    if (user.isSucces === false) HandleError({ name: user.result.name }, req, res)
    else HandleResponse({ ...req, body: user.result }, res)
  }

  static async create (req, res) {
    const result = validateUser(req.body)
    if (result.success === false) {
      return HandleError(
        { name: 'InvalidData', message: isValidData(result.error.message) },
        req,
        res
      )
    }
    const newUser = await UserModel.create({ input: result.data })
    if (newUser.isSucces === false) {
      const { name, nameMessages } = newUser
      return HandleError({ name, nameMessages }, req, res)
    } else {
      return HandleResponse({ ...req, body: newUser.result }, res)
    }
  }

  static async patch (req, res) {
    const { id } = req.params
    const result = validatePartialUser(req.body)
    if (result.success === false) {
      return HandleError({ name: 'InvalidData', message: isValidData(result.error.message) }, req, res)
    }
    const updateUser = await UserModel.patch({ id, input: { ...result.data } })
    if (updateUser.isSucces === false) {
      return HandleError({ name: 'InvalidData', nameMessages: updateUser.nameMessages }, req, res)
    } else {
      return HandleResponse({ ...req, body: updateUser.result }, res)
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await UserModel.delete({ id })
    if (result.isSucces === false) {
      const { name } = result
      return HandleError({ name }, req, res)
    }
    HandleResponse({ ...req, body: result.result }, res)
  }
}
