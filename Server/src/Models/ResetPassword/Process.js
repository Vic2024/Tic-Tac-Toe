import QueriesResetPass from './Queries.js'
const { resetPass } = QueriesResetPass
export default function Process () {
  const updatePassword = async ({ client, input }) => {
    const { id, password } = input
    try {
      const result = await client.query(resetPass(), [password, id])
      if (result) return { isSucces: true, result: { name: 'updated', res: result.rows[0] } }
    } catch (err) {
      return { isSucces: false, name: 'defaultError' }
    }
  }

  return { updatePassword }
}
