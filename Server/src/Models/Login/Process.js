import queriesLogin from './Queries.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const { getUser } = queriesLogin
export default function ProcessSQL () {
  const Login = async ({ client, input }) => {
    /*  const { username, password } = input */
    let result
    try {
      result = await client.query(getUser(), [input.username.toLowerCase()])
    } catch (err) {
      console.log(err)
    }
    const user = result.rows[0]
    const passwordCorrect = user === undefined ? false : await bcrypt.compare(input.password.toLowerCase(), user.password)
    if (!(user && passwordCorrect)) {
      return {
        isSucces: false,
        name: 'InvalidData',
        nameMessages: 'loginInvalid'
      }
    } else {
      const userForToken = {
        id: user.id,
        username: user.username
      }
      const token = jwt.sign(userForToken, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 7
      })
      const refreshToken = jwt.sign(userForToken, process.env.SECRET_KEY_REFRESH, {
        expiresIn: 60 * 60 * 24 * 7
      })
      return {
        isSuccess: true,
        result: {
          name: 'ok',
          res: {
            id: user.id,
            username: user.username,
            name: user.name,
            lastname: user.lastname,
            token,
            refreshToken
          }
        }
      }
    }
  }

  return { Login }
}
