import QueriesGame from './Queries.js'
export default function Process () {
  const CreateGame = async ({ client, players, idGame }) => {
    const [host] = players
    const board = Array(9).fill('')
    try {
      await client.query(QueriesGame.createGame(), [idGame, board, 1, host.character_id])
    } catch (err) {
      console.log(err)
    }
    return { isSuccess: true }
  }

  const DeleteGame = async ({ client, idGame }) => {
    try {
      const result = await client.query(QueriesGame.deleteGame(), [idGame])
      if (result) {
        return { isSuccess: true }
      }
    } catch (err) {
      return { isSuccess: false }
    }
  }

  const getAllGame = async ({ client, username }) => {
    const result = await Promise.allSettled([
      client.query(QueriesGame.getGameUserFrom(), [username.toLowerCase()]),
      client.query(QueriesGame.getGameUserTo(), [username.toLowerCase()])
    ]).then(([userFrom, userTo]) => {
      if (userFrom.status === 'fulfilled' && userTo.status === 'fulfilled') {
        return {
          isSuccess: true,
          res: [...userFrom.value.rows, ...userTo.value.rows]
        }
      }
    })

    return result
  }

  const updateState = async ({ client, idGame }) => {
    try {
      const result = await client.query(QueriesGame.updateStateOfGame(), [idGame])
      if (result) {
        return { isSuccess: true }
      }
    } catch (err) {
      return { isSuccess: false }
    }
  }

  const getGameRivals = async ({ client, idGame, host, invited }) => {
    const result = await Promise.allSettled([
      client.query(QueriesGame.getGameUserFromAndId(), [host.username.toLowerCase(), idGame]),
      client.query(QueriesGame.getGameUserToAndId(), [invited.username.toLowerCase(), idGame])
    ]).then(([playerHost, playerInvited]) => {
      if (playerHost.status === 'fulfilled' && playerInvited.status === 'fulfilled') {
        return {
          isSuccess: true,
          players: [...playerHost.value.rows, ...playerInvited.value.rows]
        }
      }
    })
    return result
  }
  const getGameRivalsByID = async ({ client, idGame, host, invited }) => {
    const result = await Promise.allSettled([
      client.query(QueriesGame.getGameUserFromByID(), [host, idGame]),
      client.query(QueriesGame.getGameUserToByID(), [invited, idGame])
    ]).then(([playerHost, playerInvited]) => {
      if (playerHost.status === 'fulfilled' && playerInvited.status === 'fulfilled') {
        return {
          isSuccess: true,
          players: [...playerHost.value.rows, ...playerInvited.value.rows]
        }
      }
    })

    return result
  }
  const GetGameByID = async ({ client, idGame }) => {
    try {
      const result = await client.query(QueriesGame.getGameById(), [idGame])
      if (result) {
        return {
          isSucces: true,
          result: { name: 'ok', res: { ...result.rows[0] } }
        }
      }
    } catch (err) {
      return { isSucces: false, name: 'defaultError' }
    }
  }
  const UpdateGame = async ({ client, id, board, idTurn }) => {
    try {
      const result = await client.query(QueriesGame.updateGame(), [board, idTurn.id, id])
      if (result) {
        return {
          isSuccess: true
        }
      }
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  const EndGame = async ({ client, id }) => {
    try {
      const result = await client.query(QueriesGame.endGame(), [id])
      if (result) {
        return {
          isSuccess: true
        }
      }
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  return { CreateGame, DeleteGame, getAllGame, updateState, getGameRivals, getGameRivalsByID, GetGameByID, UpdateGame, EndGame }
}
