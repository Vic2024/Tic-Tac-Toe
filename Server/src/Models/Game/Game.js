import { client } from '../../ConnectionDB.js'
import Process from './Process.js'
const { CreateGame, DeleteGame, getAllGame, updateState, getGameRivals, getGameRivalsByID, GetGameByID, UpdateGame, EndGame } = Process()
export class GameModel {
  static async getAllGame ({ username }) {
    const result = await getAllGame({ client, username })
    return result
  }

  static async createGame ({ players, idGame }) {
    const result = await CreateGame({ client, players, idGame })
    return result
  }

  static async deleteGame ({ idGame }) {
    const result = await DeleteGame({ client, idGame })
    return result
  }

  static async updateStateOfGame ({ idGame }) {
    const result = await updateState({ client, idGame })
    return result
  }

  static async getGameRivals ({ idGame, host, invited }) {
    const result = getGameRivals({ client, idGame, host, invited })
    return result
  }

  static async getGameRivalsByID ({ idGame, host, invited }) {
    const result = getGameRivalsByID({ client, idGame, host, invited })
    return result
  }

  static async getGameByID ({ idGame }) {
    const result = await GetGameByID({ client, idGame })
    return result
  }

  static async updateGame ({ id, board, idTurn }) {
    const result = await UpdateGame({ client, id, board, idTurn })
    return result
  }

  static async endGame ({ id }) {
    const result = await EndGame({ client, id })
    return result
  }
}
