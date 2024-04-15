/* import HandleError from '../Middlewares/HandleError' */
import HandleResponse from '../Middlewares/HandleResponse.js'
import { PlayersModels } from '../Models/Players/Players.js'
export class PlayersController {
  static async getPlayer (req, res) {
    const { username, idGame } = req.params
    const isPlayers = await PlayersModels.getPlayers({ username, idGame })
    if (isPlayers.isSucces !== false) HandleResponse({ ...req, body: isPlayers.result }, res)
  }
}
