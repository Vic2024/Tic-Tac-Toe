import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import queriesRecoverPass from './Queries.js'
import sendEmail from './sendEmail.js'
const { getUser } = queriesRecoverPass
dotenv.config({ path: '.env' })
const secretKey = process.env.SECRET_KEY
export default function ProcessSQL () {
  const recoverPass = async ({ client, input }) => {
    let result
    try {
      result = await client.query(getUser(), [input.email])
    } catch (err) {
      return { isSucces: false, name: 'defaultError' }
    }
    if (result.rows[0] !== undefined) {
      const { id } = result.rows[0]
      const token = jwt.sign({ id }, secretKey, { expiresIn: '10m' })
      const isSendEmail = await sendEmail({ input: { token, ...result.rows[0] } })
      if (isSendEmail === true) {
        return {
          isSuccess: true,
          result: { name: 'recovered' }
        }
      }
      return { isSucces: false, name: 'defaultError' }
    } else {
      return {
        isSucces: false,
        name: 'InvalidData',
        nameMessages: 'ErrorRecovered'
      }
    }
  }

  return { recoverPass }
}
