import HandleError from '../Middlewares/HandleError.js'
import HandleResponse from '../Middlewares/HandleResponse.js'
import { GameModel } from '../Models/Game/Game.js'
export class GameController {
  static async getGame (req, res) {
    const { id } = req.params
    const isGame = await GameModel.getGameByID({ idGame: id })
    if (isGame.isSucces !== false) {
      return HandleResponse({ ...req, body: isGame.result }, res)
    } else {
      const { name } = isGame
      return HandleError({ name }, req, res)
    }
  }
}
