import QueriesUser from './Queries.js'
import bcrypt from 'bcrypt'
const { allData, insertUser, deleteUser, getByID, updateUser, isRealUser, getDataByUsername } = QueriesUser

export default function ProcessSQL () {
  const queryGetAllUsers = async ({ client, params }) => {
    try {
      const { rows: users } = await client.query(allData(), [params])
      if (users.length === 0) return { isSucces: false, result: { name: 'NotFound' } }
      else return { isSucces: true, result: { name: 'ok', res: users } }
    } catch (err) {
      return { isSucces: false, name: 'defaultError' }
    }
  }
  const queryGetByID = async ({ client, id }) => {
    try {
      const { rows: user } = await client.query(getByID(), [id])
      if (user.length === 0) return { isSucces: false, result: { name: 'NotFound' } }
      else return { isSucces: true, result: { name: 'ok', res: user } }
    } catch (err) {
      return { isSucces: false, name: 'defaultError' }
    }
  }

  const getByUsername = async ({ client, username }) => {
    try {
      const { rows: user } = await client.query(getDataByUsername(), [username.toLowerCase()])
      if (user.length === 0) return { isSucces: false, result: { name: 'NotFound' } }
      else return { isSucces: true, result: { name: 'ok', res: user } }
    } catch (err) {
      return { isSucces: false, name: 'defaultError' }
    }
  }

  const queryInsertUser = async ({ client, input }) => {
    try {
      const result = await client.query(insertUser(), Object.values(input))
      if (result) return { isSucces: true, result: { name: 'created', res: result.rows[0] } }
    } catch (err) {
      if (err.code === '23505') {
        return {
          isSucces: false,
          name: 'InvalidData',
          nameMessages: err.detail.includes('username') ? 'usernameInvalid' : 'emailInvalid'
        }
      }
      return { isSucces: false, name: 'defaultError' }
    }
  }
  const queryDeleteUser = async ({ client, id }) => {
    try {
      const result = await client.query(deleteUser(), [id])
      if (result) return { isSucces: true, result: { name: 'deleted', res: result.rows[0] } }
    } catch (err) {
      return { isSucces: false, name: 'defaultError' }
    }
  }
  const queryUpdateUser = async ({ client, id, input }) => {
    const queryToPartialEdit = Object.keys(input).map((key, index) => ` ${key} = $${index + 1}`).toString()
    const returning = Object.keys(input).toString()
    try {
      const result = await client.query(updateUser(queryToPartialEdit, returning), [...Object.values(input), id])
      if (result) return { isSucces: true, result: { name: 'updated', res: result.rows[0] } }
    } catch (err) {
      if (err.code === '23505') {
        return {
          isSucces: false,
          name: 'InvalidData',
          nameMessages: err.detail.includes('username') ? 'usernameInvalid' : 'emailInvalid'
        }
      }
      return { isSucces: false, name: 'defaultError' }
    }
  }
  const queryConfirmPassword = async ({ client, id, input }) => {
    let result
    try {
      result = await client.query(isRealUser(), [id])
    } catch (err) {
      return { isSucces: false, name: 'defaultError' }
    }
    const passwordUser = result.rows[0].password
    const isUser = passwordUser === undefined ? false : await bcrypt.compare(input.confirmPassword.toLowerCase(), passwordUser)
    if (isUser === false) {
      return {
        isSucces: false,
        name: 'InvalidData',
        nameMessages: 'ConfirmPassword'
      }
    } else {
      return { isSucces: true }
    }
  }

  return { queryGetAllUsers, queryInsertUser, queryDeleteUser, queryGetByID, queryUpdateUser, queryConfirmPassword, getByUsername }
}
