/* eslint-disable camelcase */
import QueriesRivals from './Queries.js'
export default function Process () {
  const createRivals = async ({ host, invited, idGame, client }) => {
    try {
      const result = await client.query(QueriesRivals.createRivals(), [host.id, invited.id, idGame])
      if (result) {
        return {
          isSuccess: true,
          res: { ...result.rows[0] }
        }
      }
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  const deleteRivals = async ({ client, id }) => {
    try {
      const result = await client.query(QueriesRivals.deleteRivals(), [id])
      if (result) {
        return {
          isSuccess: true,
          res: { ...result.rows[0] }
        }
      }
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  const getRivals = async ({ client, content }) => {
    try {
      const result = await client.query(QueriesRivals.getRivals(), [content])
      if (result) {
        return {
          isSuccess: true,
          rivals: [...result.rows]
        }
      }
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  const GetRivalsToUpdate = async ({ client, idGame }) => {
    try {
      const result = await client.query(QueriesRivals.getRivalsToUpdate(), [idGame])
      if (result) {
        const { id_player1, username_player1, id_player2, username_player2 } = result.rows[0]
        return {
          isSuccess: true,
          players: [
            { id: id_player1, username: username_player1 },
            { id: id_player2, username: username_player2 }
          ]
        }
      }
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  return { createRivals, deleteRivals, getRivals, GetRivalsToUpdate }
}
