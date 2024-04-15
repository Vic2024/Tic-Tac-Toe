import { Router } from 'express'
import { RecoverEmailControler } from '../Controller/RecoverEmail.js'
export const RecoverEmail = Router()
RecoverEmail.post('/', RecoverEmailControler.recoverEmail)
