import { client } from '../../ConnectionDB.js'
import Process from './Process.js'
const { createPlayers, deletePlayers, updateRequest, GetPlayers, SaveResult } = Process()
export class PlayersModels {
  static async getPlayers ({ username, idGame }) {
    const getPlayers = await GetPlayers({ client, username, idGame })
    return getPlayers
  }

  static async createPlayers ({ players }) {
    const isCreatePlayer = await createPlayers({ client, players })
    return isCreatePlayer
  }

  static async deletePlayers ({ id }) {
    const isDeletePlayer = await deletePlayers({ client, id })
    return isDeletePlayer
  }

  static async updateRequestPlayer ({ id }) {
    const isUpdateRequest = await updateRequest({ client, id })
    return isUpdateRequest
  }

  static async saveResult ({ winner, loser }) {
    const result = await SaveResult({ client, winner, loser })
    return result
  }
}
