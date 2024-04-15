import { client } from '../../ConnectionDB.js'
import Process from './Process.js'
const { CreateNotifi, getAllNotifi, deleteNotifi, updateRead } = Process()
export class NotifiModels {
  static async createNotifi ({ idRivals, players }) {
    const result = await CreateNotifi({ client, players, idRivals })
    return result
  }

  static async getAllNotifi ({ username }) {
    const result = await getAllNotifi({ client, username })
    return result
  }

  static async deleteNotifi ({ idNotifi }) {
    const result = await deleteNotifi({ client, idNotifi })
    return result
  }

  static async updateRead ({ idNotifi }) {
    const result = await updateRead({ client, idNotifi })
    return result
  }
}
