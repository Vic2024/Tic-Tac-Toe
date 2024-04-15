import QueriesPlayers from './Queries.js'
export default function Process () {
  const createPlayers = async ({ client, players }) => {
    const [host, invited] = players
    let savePlayers = []
    await Promise.allSettled([
      client.query(QueriesPlayers.createPlayers(), [host.name, host.lastname, host.username, host.character, host.request]),
      client.query(QueriesPlayers.createPlayers(), [invited.name, invited.lastname, invited.username, invited.character, invited.request])
    ]).then(([player1, player2]) => {
      if (player1.status === 'fulfilled' && player2.status === 'fulfilled') {
        const newArray = [player1.value.rows[0], player2.value.rows[0]]
        savePlayers = [...newArray]
      }
    }).catch(err => console.log(err))
    return { isSucces: true, savePlayers }
  }

  const deletePlayers = async ({ client, id }) => {
    try {
      const result = await client.query(QueriesPlayers.deletePlayers(), [id])
      if (result) {
        return { isSuccess: true }
      }
    } catch (err) {
      return { isSuccess: false }
    }
  }

  const updateRequest = async ({ client, id }) => {
    try {
      const result = await client.query(QueriesPlayers.updatePlayer(), [id])
      if (result) {
        return { isSuccess: true }
      }
    } catch (err) {
      return { isSuccess: false }
    }
  }

  const GetPlayers = async ({ client, username, idGame }) => {
    const result = await Promise.allSettled([
      client.query(QueriesPlayers.getPlayersHost(), [idGame, username.toLowerCase()]),
      client.query(QueriesPlayers.getPlayersInvited(), [idGame, username.toLowerCase()])
    ]).then(([host, invited]) => {
      if (host.status === 'fulfilled' && invited.status === 'fulfilled') {
        return {
          isSucces: true,
          result: { name: 'ok', res: { ...host.value.rows[0], ...invited.value.rows[0] } }
        }
      }
    })

    return result
  }

  const SaveResult = async ({ client, winner, loser }) => {
    try {
      const result = await Promise.allSettled([
        client.query(QueriesPlayers.updatePlayerResult(), [1, winner.id]),
        client.query(QueriesPlayers.updatePlayerResult(), [2, loser.id])
      ]).then(([winner, loser]) => {
        if (winner.status === 'fulfilled' && loser.status === 'fulfilled') {
          if (winner.value && loser.value) {
            return {
              isSuccess: true,
              playersResult: [{ ...winner.value.rows[0] }, { ...loser.value.rows[0] }]
            }
          }
        }
      })

      if (result.isSuccess !== false) {
        return {
          isSuccess: true,
          result: result.playersResult
        }
      }
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  return { createPlayers, deletePlayers, updateRequest, GetPlayers, SaveResult }
}
