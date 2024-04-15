import { client } from '../../ConnectionDB.js'
import ProcessSQL from './Process.js'
import crypto from 'node:crypto'
import { encryptPassword } from '../../Controller/helper/User.js'
const { queryGetAllUsers, queryInsertUser, queryDeleteUser, queryGetByID, queryUpdateUser, queryConfirmPassword, getByUsername } = ProcessSQL()
export class UserModel {
  static async getAll ({ input }) {
    const { username, params } = input
    if (username) {
      const result = await getByUsername({ client, username: username.toLowerCase() })
      return result
    } else {
      const result = await queryGetAllUsers({ client, params })
      return result
    }
  }

  static async getById ({ id }) {
    const result = await queryGetByID({ client, id })
    return result
  }

  static async create ({ input }) {
    const password = await encryptPassword(10, input.password.toLowerCase())
    const newData = {
      id: crypto.randomUUID(),
      name: input.name,
      lastname: input.lastname,
      username: input.username,
      password,
      email: input.email.toLowerCase()
    }
    const result = await queryInsertUser({
      client,
      input: newData
    })
    return result
  }

  static async patch ({ id, input }) {
    let dataToUpdate = { ...input }
    if (input.password) {
      const password = await encryptPassword(10, input.password)
      dataToUpdate = { ...dataToUpdate, password }
    }
    const result = await queryUpdateUser({
      id,
      client,
      input: { ...dataToUpdate }
    })
    return result
  }

  static async delete ({ id }) {
    const result = await queryDeleteUser({ client, id })
    return result
  }

  static async isRealUser ({ id, input }) {
    const result = await queryConfirmPassword({ client, id, input })
    return result
  }
}
