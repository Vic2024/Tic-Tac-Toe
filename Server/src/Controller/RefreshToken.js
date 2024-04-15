import { UserModel } from '../Models/User/User.js'
import HandleError from '../Middlewares/HandleError.js'
import HandleResponse from '../Middlewares/HandleResponse.js'
import jwt from 'jsonwebtoken'

export class RefreshTokneController {
  static async refresToken (req, res) {
    let verifyResult
    const refreshToken = req.headers.refresh
    if (!(refreshToken)) {
      HandleError({ name: 'CastError' }, req, res)
    }

    try {
      verifyResult = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH)
    } catch (err) {
      HandleError({ name: 'CastError' }, req, res)
    }

    const { username } = verifyResult
    const isUserExist = await UserModel.getAll({ input: { username } })
    if (isUserExist.isSucces === true) {
      const { id, username } = isUserExist.result.res[0]
      const userForToken = { id, username }
      const token = jwt.sign(userForToken, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 7
      })
      HandleResponse({ ...req, body: { name: isUserExist.result.name, res: token } }, res)
    } else {
      HandleError({ name: 'CastError' }, req, res)
    }
  }
}
