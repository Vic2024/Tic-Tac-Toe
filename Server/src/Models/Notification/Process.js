import QueriesNotifi from './Queries.js'
export default function Process () {
  const CreateNotifi = async ({ client, players, idRivals }) => {
    const [host, invited] = players
    const date = new Date()
    let newNotifi
    try {
      await client.query(
        QueriesNotifi.createNotifi(),
        [host.username, invited.username, false, date, idRivals.id]
      )
    } catch (err) {
      return { isSuccess: false }
    }
    try {
      const result = await client.query(
        QueriesNotifi.getNotifiSave(),
        [invited.username.toLowerCase(), idRivals.id]
      )
      const newData = result.rows
      newNotifi = [...newData]
    } catch (err) {
      return { isSuccess: false }
    }

    return { isSuccess: true, newNotifi }
  }

  const getAllNotifi = async ({ client, username }) => {
    try {
      const result = await client.query(QueriesNotifi.getAllNotifi(), [username.toLowerCase()])
      return { isSuccess: true, allNotifi: result.rows }
    } catch (err) {
      return { isSuccess: false }
    }
  }

  const deleteNotifi = async ({ client, idNotifi }) => {
    try {
      const result = await client.query(QueriesNotifi.deleteNotifi(), [idNotifi])
      if (result) {
        return { isSuccess: true }
      }
    } catch (err) {
      return { isSuccess: false }
    }
  }

  const updateRead = async ({ client, idNotifi }) => {
    try {
      const result = await client.query(QueriesNotifi.updateNotifi(), [idNotifi])
      if (result) {
        return { isSuccess: true }
      }
    } catch (err) {
      return { isSuccess: false }
    }
  }
  return { CreateNotifi, getAllNotifi, deleteNotifi, updateRead }
}
