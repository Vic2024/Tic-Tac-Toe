import { client } from '../../ConnectionDB.js'
import Process from './Process.js'
const { getCharacterId } = Process()
export class CharacterModel {
  static async getCharacterId ({ turn }) {
    const result = await getCharacterId({ client, turn })
    return result
  }
}
