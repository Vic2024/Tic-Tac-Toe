/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import { PlayersModels } from '../Models/Players/Players.js'
import { GameModel } from '../Models/Game/Game.js'
import { NotifiModels } from '../Models/Notification/Notification.js'
import { RivalsModel } from '../Models/Rivals/Rivals.js'
import crypto from 'crypto'

export class SocketController {
  static async Init ({ username }) {
    const result = await Promise.allSettled([
      NotifiModels.getAllNotifi({ username }),
      GameModel.getAllGame({ username })
    ]).then(([notifi, game]) => {
      if (notifi.status === 'fulfilled' && game.status === 'fulfilled') {
        if (notifi.value.isSuccess !== false && game.value.isSuccess !== false) {
          return {
            notifi: [...notifi.value.allNotifi],
            game: [...game.value.res]

          }
        }
      }
    }).catch(err => console.log(err))
    if (result) {
      return {
        isSuccess: true,
        notifi: [...result.notifi],
        game: [...result.game]

      }
    } else {
      return {
        isSuccess: false
      }
    }
  }

  static disconnect (socket, users) {
    let newUsers
    const usersOnline = users.filter(user => user.socketId !== socket.id)
    newUsers = usersOnline
    return { isSucces: true, result: { newUsers } }
  }

  static async gameCreate ({ players }) {
    const isCreatePlayer = await PlayersModels.createPlayers({ players })
    if (isCreatePlayer.isSucces !== false) {
      const idGame = crypto.randomUUID()
      const [host, invited] = isCreatePlayer.savePlayers
      const result = await Promise.allSettled([
        RivalsModel.createRivals({ host, invited, idGame }),
        GameModel.createGame({ idGame, players: [host, invited] })
      ]).then(([rivals, game]) => {
        if (rivals.status === 'fulfilled' && game.status === 'fulfilled') {
          if (rivals.value.isSuccess !== false && game.value.isSuccess !== false) {
            return {
              isSuccess: true,
              res: { ...rivals.value.res }
            }
          }
        }
      })

      if (result.isSuccess !== false) {
        const result2 = await Promise.allSettled([
          NotifiModels.createNotifi({ idRivals: { ...result.res }, players: [host, invited] }),
          GameModel.getGameRivals({ idGame, host, invited })
        ]).then(([notifi, game]) => {
          if (notifi.status === 'fulfilled' && game.status === 'fulfilled') {
            if (notifi.value.isSuccess !== false && game.value.isSuccess !== false) {
              return {
                isSuccess: true,
                newNotifi: [...notifi.value.newNotifi],
                game: [...game.value.players]
              }
            }
          }
        })
        if (result2) {
          return {
            isSuccess: true,
            newNotifi: [...result2.newNotifi],
            game: [...result2.game]
          }
        }
      }
    } else {
      return { isSuccess: false }
    }
  }

  static async rejectGame ({ idNotifi, content }) {
    const isDeleteNotifi = await NotifiModels.deleteNotifi({ idNotifi })
    if (isDeleteNotifi.isSuccess !== false) {
      const isDeleteRivals = await RivalsModel.deleteRivals({ id: content })
      if (isDeleteRivals.isSuccess !== false) {
        const { user_from, user_to, game_id } = isDeleteRivals.res
        const result = await Promise.allSettled([
          PlayersModels.deletePlayers({ id: user_from }),
          PlayersModels.deletePlayers({ id: user_to }),
          GameModel.deleteGame({ idGame: game_id })
        ]).then(([player1, player2, game]) => {
          if (player1.status === 'fulfilled' && player2.status === 'fulfilled' && game.status === 'fulfilled') {
            if (player1.value.isSuccess !== false && player2.value.isSuccess !== false && game.value.isSuccess !== false) {
              return {
                isSuccess: true
              }
            }
          } else {
            return {
              isSuccess: false
            }
          }
        })

        return result
      }
    }
  }

  static async AcepptGame ({ idNotifi, content }) {
    const result = await Promise.allSettled([
      NotifiModels.updateRead({ idNotifi }),
      RivalsModel.getRivals({ content })
    ]).then(([notifi, rivals]) => {
      if (notifi.status === 'fulfilled' && rivals.status === 'fulfilled') {
        if (notifi.value.isSuccess !== false && rivals.value.isSuccess !== false) {
          return {
            isSuccess: true,
            res: [...rivals.value.rivals]
          }
        }
      }
    })
    if (result.isSuccess !== false) {
      const [rivals] = result.res
      const result2 = await Promise.allSettled([
        PlayersModels.updateRequestPlayer({ id: rivals.user_to }),
        GameModel.updateStateOfGame({ idGame: rivals.game_id })
      ]).then(([players, game]) => {
        if (players.status === 'fulfilled' && game.status === 'fulfilled') {
          if (players.value.isSuccess !== false && game.value.isSuccess !== false) {
            return {
              isSuccess: true
            }
          }
        }
      })
      if (result2.isSuccess !== false) {
        const getNewGames = await GameModel.getGameRivalsByID({ idGame: rivals.game_id, host: rivals.user_from, invited: rivals.user_to })
        if (getNewGames.isSuccess !== false) {
          return {
            isSuccess: true,
            Players: [...getNewGames.players]
          }
        }
      }
    }
  }
}
