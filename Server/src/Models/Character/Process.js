import QueriesCharacter from './Queries.js'
export default function Process () {
  const getCharacterId = async ({ client, turn }) => {
    try {
      const result = await client.query(QueriesCharacter.getCharacterId(), [turn])
      if (result) {
        return {
          isSuccess: true,
          turnId: { ...result.rows[0] }
        }
      }
    } catch (err) {
      return {
        isSuccess: false
      }
    }
  }

  return { getCharacterId }
}
