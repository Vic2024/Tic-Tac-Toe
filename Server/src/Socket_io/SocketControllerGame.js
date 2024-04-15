import { CharacterModel } from '../Models/Character/Character.js'
import { GameModel } from '../Models/Game/Game.js'
import { RivalsModel } from '../Models/Rivals/Rivals.js'
import { PlayersModels } from '../Models/Players/Players.js'
export class SocketControllerGame {
  static async saveGame ({ game }) {
    let getCharacterId
    if (typeof game.turn === 'string') {
      const result = await CharacterModel.getCharacterId({ turn: game.turn })
      if (result.isSuccess === true) {
        getCharacterId = {
          turnId: result.turnId
        }
      }
    } else {
      getCharacterId = {
        turnId: {
          id: game.turn
        }
      }
    }
    const saveGame = await GameModel.updateGame({ id: game.id, board: game.board, idTurn: getCharacterId.turnId })
    if (saveGame.isSuccess !== false) {
      return {
        isSuccess: true
      }
    }
  }

  static async getGameById ({ id }) {
    const getGame = await GameModel.getGameByID({ idGame: id })
    if (getGame.isSucces === true) {
      return {
        isSuccess: true,
        game: getGame.result.res
      }
    }
  }

  static async EndGame ({ host, idGame, rival }) {
    const result = await Promise.allSettled([
      await GameModel.endGame({ id: idGame }),
      await RivalsModel.getRivalsToUpdate({ idGame })
    ]).then(([game, rival]) => {
      if (game.status === 'fulfilled' && rival.status === 'fulfilled') {
        if (game.value.isSuccess !== false && rival.value.isSuccess !== false) {
          return {
            isSuccess: true,
            players: rival.value.players
          }
        }
      }
    })
    if (result.isSuccess !== false) {
      const saveResult = await PlayersModels.saveResult({
        winner: result.players.find(user => user.username === host),
        loser: result.players.find(user => user.username === rival)
      })
      if (saveResult.isSuccess !== false) {
        return {
          isSuccess: true,
          playersResult: saveResult.result
        }
      }
    }
  }
}
