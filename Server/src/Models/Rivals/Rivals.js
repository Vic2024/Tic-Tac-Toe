import { client } from '../../ConnectionDB.js'
import Process from './Process.js'
const { createRivals, deleteRivals, getRivals, GetRivalsToUpdate } = Process()
export class RivalsModel {
  static async createRivals ({ host, invited, idGame }) {
    const result = createRivals({ host, invited, idGame, client })
    return result
  }

  static async deleteRivals ({ id }) {
    const result = await deleteRivals({ client, id })
    return result
  }

  static async getRivals ({ content }) {
    const result = await getRivals({ client, content })
    return result
  }

  static async getRivalsToUpdate ({ idGame }) {
    const result = await GetRivalsToUpdate({ client, idGame })
    return result
  }
}
