/* eslint-disable no-unused-expressions */
import { Server } from 'socket.io'
import express from 'express'
import { createServer } from 'node:http'
import { SocketController } from './SocketController.js'
import { SocketControllerGame } from './SocketControllerGame.js'
import { validatePlayer } from '../Validation/Player.js'
import userActive from '../Helper/usersActive.js'
import { checkEndGame, checkWinnerForm } from '../Helper/board.js'
import jwt from 'jsonwebtoken'
export const app = express()
export const server = createServer(app)
const io = new Server(server, {
  cors: { origin: '*' },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true
  }
})
let users = []
const userAuth = (socket, next) => {
  let token, decodedToken
  if (socket.handshake.auth && socket.handshake.auth.token) {
    token = socket.handshake.auth.token
  }
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  } catch (err) {
    io.to(socket.id).emit('Logout', { isLogged: true })
  }
  if (!token || !decodedToken.id) {
    io.to(socket.id).emit('Logout', { isLogged: true })
  }
  next()
}

io.use(userAuth).on('connection', async (socket) => {
  const resultUserActive = userActive(socket, users)
  if (resultUserActive.isSucces !== false) {
    if (resultUserActive.result.oldSocketId) io.to(resultUserActive.result.oldSocketId).emit('Logout', { isLogged: true })
    users = [...resultUserActive.result.newUsers]
    const resultBase = await SocketController.Init({ username: socket.handshake.auth.username })
    if (resultBase.isSuccess !== false) {
      io.emit('init', users)
      io.to(socket.id).emit('notification', { action: 'get', data: resultBase.notifi })
      io.to(socket.id).emit('games', { action: 'get', data: resultBase.game })
    }
  }

  socket.on('disconnect', () => {
    const discoUser = SocketController.disconnect(socket, users)
    if (discoUser.isSucces === true) {
      users = [...discoUser.result.newUsers]
      io.emit('init', users, socket.id)
    }
  })

  socket.on('create_game', async ({ from, to }) => {
    const result1 = validatePlayer(from)
    const result2 = validatePlayer(to)
    const host = result1.success === true ? result1.data : result1.error
    const invited = result2.success === true ? result2.data : result2.error
    const isCreateGame = await SocketController.gameCreate({ players: [host, invited] })
    if (isCreateGame.isSuccess !== false) {
      const player1 = isCreateGame.game.find(player => player.username === from.username)
      const player2 = isCreateGame.game.find(player => player.username === to.username)
      io.to(socket.id).emit('games', { action: 'push', data: [{ ...player2 }] })
      if (to.socketId && to.socketId.length > 0) {
        io.to(to.socketId).emit('games', { action: 'push', data: [{ ...player1 }] })
        io.to(to.socketId).emit('notification', { action: 'push', data: isCreateGame.newNotifi })
        io.to(to.socketId).emit('messages', {
          es: `${socket.handshake.auth.username} te ha invitado a jugar!`,
          en: `${socket.handshake.auth.username} has invited you to play!`
        })
      }
    }
  })

  socket.on('responseRequest', async ({ data, action }) => {
    if (action === 'reject') {
      const userFrom = users.find(user => user.username === data.user_from)
      const isReject = await SocketController.rejectGame({ idNotifi: data.id, content: data.content })
      if (isReject.isSuccess !== false) {
        io.to(socket.id).emit('notification', { action: 'deleteData', data: data.id })
        io.to(socket.id).emit('games', { action: 'deleteData', data: data.content })
        if (userFrom && userFrom.socketId.length > 0) {
          io.to(userFrom.socketId).emit('notification', { action: 'deleteData', data: data.content })
          io.to(userFrom.socketId).emit('games', { action: 'deleteData', data: data.content })
          io.to(userFrom.socketId).emit('messages', {
            es: `${socket.handshake.auth.username} Ha rechazado la invitación`,
            en: `${socket.handshake.auth.username} has invited you to play!`
          })
        }
      }
    } else if (action === 'aceppt') {
      const isAceppt = await SocketController.AcepptGame({ idNotifi: data.id, content: data.content })
      if (isAceppt.isSuccess !== false) {
        const userFrom = users.find(user => user.username === data.user_from)
        const player1 = isAceppt.Players.find(user => user.username === data.user_from)
        const player2 = isAceppt.Players.find(user => user.username === data.user_to)
        io.to(socket.id).emit('notification', { action: 'deleteData', data: data.id })
        io.to(socket.id).emit('games', { action: 'update', data: player1 })
        if (userFrom && userFrom.socketId.length > 0) {
          io.to(userFrom.socketId).emit('games', { action: 'update', data: player2 })
          io.to(userFrom.socketId).emit('messages', {
            es: `${socket.handshake.auth.username} Ha aceptado la invitación`,
            en: `${socket.handshake.auth.username} has accepted the invitation`
          })
        }
      }
    }
  })

  socket.on('saveGame', async ({ game, rival }) => {
    const isWinner = checkWinnerForm(game.board)
    const isCheckBoard = checkEndGame(game.board)
    const isLoggedRival = users.find(user => user.username === rival)
    if (isWinner) {
      const saveGame = await SocketControllerGame.saveGame({ game })
      if (saveGame.isSuccess === true) {
        io.to(socket.id).emit('games', { action: 'update', data: { id: game.id, turn: game.turn } })
        io.to(socket.id).emit('getWinner', isWinner)
        if (isLoggedRival && isLoggedRival.socketId.length > 0) {
          io.to(isLoggedRival.socketId).emit('getSavedGame', { ...game })
          io.to(isLoggedRival.socketId).emit('games', { action: 'update', data: { id: game.id, turn: game.turn } })
          io.to(isLoggedRival.socketId).emit('getWinner', isWinner)
          io.to(isLoggedRival.socketId).emit('messages', {
            inGame: true,
            idGame: game.id,
            message: {
              es: `Tenemos un ganador en el juego contra ${socket.handshake.auth.username} !`,
              en: `We have a winner in the game against ${socket.handshake.auth.username} !`
            }
          })
        }
      }
    } else {
      if (isCheckBoard) {
        const newBoard = Array(9).fill('')
        const saveGame = await SocketControllerGame.saveGame({ game: { ...game, board: newBoard } })
        if (saveGame.isSuccess !== false) {
          const newGame = { ...game, board: newBoard }
          io.to(socket.id).emit('games', { action: 'update', data: { id: game.id, turn: game.turn } })
          io.to(socket.id).emit('getSavedGame', { ...newGame })
          if (isLoggedRival && isLoggedRival.socketId.length > 0) {
            io.to(isLoggedRival.socketId).emit('getSavedGame', { ...newGame })
            io.to(isLoggedRival.socketId).emit('games', { action: 'update', data: { id: game.id, turn: game.turn } })
            io.to(isLoggedRival.socketId).emit('messages', {
              inGame: true,
              idGame: game.id,
              message: {
                es: `El juego con ${socket.handshake.auth.username} se reinició`,
                en: `The game with ${socket.handshake.auth.username} restarted`
              }
            })
          }
        }
      } else {
        const saveGame = await SocketControllerGame.saveGame({ game })
        if (saveGame.isSuccess === true) {
          io.to(socket.id).emit('games', { action: 'update', data: { id: game.id, turn: game.turn } })
          if (isLoggedRival && isLoggedRival.socketId.length > 0) {
            io.to(isLoggedRival.socketId).emit('getSavedGame', { ...game })
            io.to(isLoggedRival.socketId).emit('games', { action: 'update', data: { id: game.id, turn: game.turn } })
            io.to(isLoggedRival.socketId).emit('messages', {
              inGame: true,
              idGame: game.id,
              message: {
                es: `Es tu turno en el juego contra ${socket.handshake.auth.username} !`,
                en: `It's your turn in the game against ${socket.handshake.auth.username} !`
              }
            })
          }
        }
      }
    }
  })

  socket.on('resetGame', async ({ idGame, rival }) => {
    const isLoggedRival = users.find(user => user.username === rival)
    const newGame = {
      id: idGame,
      board: Array(9).fill(''),
      turn: Math.round(Math.random() * (2 - 1) + 1)
    }
    const saveGame = await SocketControllerGame.saveGame({ game: { ...newGame } })
    if (saveGame.isSuccess === true) {
      const getGame = await SocketControllerGame.getGameById({ id: idGame })
      if (getGame.isSuccess === true) {
        io.to(socket.id).emit('getSavedGame', { ...getGame.game })
        io.to(socket.id).emit('games', { action: 'update', data: { id: getGame.game.id, turn: getGame.game.turn } })
        io.to(socket.id).emit('getWinner', null)
        if (isLoggedRival && isLoggedRival.socketId.length > 0) {
          io.to(isLoggedRival.socketId).emit('getSavedGame', { ...getGame.game })
          io.to(isLoggedRival.socketId).emit('games', { action: 'update', data: { id: getGame.game.id, turn: getGame.game.turn } })
          io.to(isLoggedRival.socketId).emit('getWinner', null)
          io.to(isLoggedRival.socketId).emit('messages', {
            inGame: true,
            idGame,
            message: {
              es: `${socket.handshake.auth.username} ha decidido reiniciar el juego !`,
              en: `${socket.handshake.auth.username} has decided to restart the game !`
            }
          })
        }
      }
    }
  })

  socket.on('endGame', async ({ idGame, rival }) => {
    const isLoggedRival = users.find(user => user.username === rival)
    const isEndGame = await SocketControllerGame.EndGame({ host: socket.handshake.auth.username, idGame, rival })
    if (isEndGame.isSuccess !== false) {
      io.to(socket.id).emit('endGame', { endGame: true, idGame })
      io.to(socket.id).emit('games', { action: 'update', data: { state_of_game: 'Finished', id: idGame, result: isEndGame.playersResult.find(result => result.username === socket.handshake.auth.username).result } })
      if (isLoggedRival && isLoggedRival.socketId.length > 0) {
        io.to(isLoggedRival.socketId).emit('endGame', { endGame: true, idGame })
        io.to(isLoggedRival.socketId).emit('games', { action: 'update', data: { state_of_game: 'Finished', id: idGame, result: isEndGame.playersResult.find(result => result.username === rival).result } })
        io.to(isLoggedRival.socketId).emit('messages', {
          inGame: true,
          idGame,
          message: {
            es: `${socket.handshake.auth.username} decidido finalizar el juego !`,
            en: `${socket.handshake.auth.username} has decided to end the game !`
          }
        })
      }
    }
  })
})
